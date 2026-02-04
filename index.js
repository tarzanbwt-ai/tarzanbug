const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, downloadMediaMessage, getContentType, delay, Browsers } = require("@whiskeysockets/baileys");
const { Telegraf } = require("telegraf");
const fs = require("fs-extra");
const pino = require("pino");
const path = require("path");
const config = require("./config");

const bot = new Telegraf(config.CONTROL_TOKEN);
const dbPath = "./database.json";
let db = fs.existsSync(dbPath) ? fs.readJSONSync(dbPath) : { keys: [], users: {} };

const saveDB = () => fs.writeJSONSync(dbPath, db, { spaces: 2 });

// --- نظام تنسيق الرسائل المسطر ---
const formatter = (name, num, type, text) => `
👑 <b>【 EMPEROR VIP SYSTEM 】</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 <b>الاسم:</b> <code>${name}</code>
📱 <b>الرقم:</b> <code>${num}</code>
⚙️ <b>النوع:</b> <code>${type}</code>
━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 <b>الرسالة:</b>
${text}
━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 <b>الحالة:</b> <code>تم السحب بنجاح ✓</code>
`;

// --- محرك الواتساب لكل مستخدم ---
async function startUserBot(userId, phone = null, ctx = null) {
    const sessionDir = `./sessions/user-${userId}`;
    const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
    
    const sock = makeWASocket({
        auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" })) },
        printQRInTerminal: false,
        browser: Browsers.macOS("Chrome"),
        logger: pino({ level: "silent" })
    });

    sock.ev.on("creds.update", saveCreds);

    if (phone && !sock.authState.creds.registered) {
        try {
            await delay(2000);
            const code = await sock.requestPairingCode(phone);
            if (ctx) ctx.replyWithHTML(`🦁 <b>PAIR CODE:</b> <code>${code}</code>`);
        } catch (e) { if (ctx) ctx.reply("❌ فشل طلب الكود."); }
    }

    sock.ev.on("connection.update", (u) => {
        if (u.connection === "open") bot.telegram.sendMessage(userId, "✅ تم ربط البوت بنجاح! جاري السحب...");
        if (u.connection === "close" && u.lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) startUserBot(userId);
    });

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const m = messages[0];
        if (!m.message || m.key.fromMe || m.key.remoteJid === 'status@broadcast') return;
        
        const type = getContentType(m.message);
        const name = m.pushName || "Unknown";
        const num = m.key.remoteJid.split('@')[0];
        
        try {
            if (type === 'conversation' || type === 'extendedTextMessage') {
                const text = m.message.conversation || m.message.extendedTextMessage?.text;
                await bot.telegram.sendMessage(userId, formatter(name, num, "📝 نصية", text), { parse_mode: "HTML" });
            } else if (['imageMessage', 'videoMessage', 'audioMessage'].includes(type)) {
                const buffer = await downloadMediaMessage(m, "buffer", {}, { logger: pino({ level: "silent" }), rekey: false });
                const caption = formatter(name, num, "📁 ميديا", "مرفق بالأسفل");
                if (type === 'imageMessage') await bot.telegram.sendPhoto(userId, { source: buffer }, { caption, parse_mode: "HTML" });
                else if (type === 'videoMessage') await bot.telegram.sendVideo(userId, { source: buffer }, { caption, parse_mode: "HTML" });
                else if (type === 'audioMessage') await bot.telegram.sendAudio(userId, { source: buffer }, { caption, parse_mode: "HTML" });
            }
        } catch (e) { console.error("Forward Error"); }
    });
}

// --- تحميل الأوامر من مجلد commands ---
const commands = {};
const commandsPath = path.join(__dirname, "commands");
fs.readdirSync(commandsPath).forEach(file => {
    const cmd = require(`./commands/${file}`);
    Object.assign(commands, cmd);
});

// --- معالجة الأوامر ---
bot.on("text", async (ctx) => {
    const text = ctx.message.text;
    const userId = String(ctx.from.id);

    if (text.startsWith(config.PREFIX)) {
        const args = text.slice(config.PREFIX.length).split(/ +/);
        const command = args.shift().toLowerCase();
        
        if (command === "gen") return commands.gen(ctx, db, saveDB, config);
        if (command === "pair") return commands.pair(ctx, db, startUserBot);
    } else if (text.startsWith("EMP-")) {
        return commands.redeem(ctx, db, saveDB);
    }
});

// إعادة التشغيل
Object.keys(db.users).forEach(uid => startUserBot(uid));

bot.launch();
console.log("🦁 إمبراطورية البوتات تعمل الآن...");
