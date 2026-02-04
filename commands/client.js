module.exports = {
    redeem: (ctx, db, saveDB) => {
        const key = ctx.message.text.trim();
        const userId = String(ctx.from.id);
        const kIdx = db.keys.findIndex(k => k.key === key && !k.used);
        if (kIdx === -1) return ctx.reply("❌ كود خاطئ أو مستخدم.");
        db.keys[kIdx].used = true;
        db.users[userId] = { active: true };
        saveDB();
        ctx.reply("✅ تم تفعيل اشتراكك! استخدم /pair رقمك لربط البوت.");
    },
    pair: async (ctx, db, startUserBot) => {
        const userId = String(ctx.from.id);
        if (!db.users[userId]) return ctx.reply("❌ أنت غير مشترك.");
        const phone = ctx.message.text.split(" ")[1]?.replace(/\D/g, "");
        if (!phone) return ctx.reply("⚠️ مثال: /pair 9665xxxxxxxx");
        await startUserBot(userId, phone, ctx);
    }
};
