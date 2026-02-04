module.exports = {
    gen: (ctx, db, saveDB, config) => {
        if (String(ctx.from.id) !== config.ADMIN_ID) return ctx.reply("❌ للمالك فقط.");
        const key = "EMP-" + Math.random().toString(36).substr(2, 8).toUpperCase();
        db.keys.push({ key, used: false });
        saveDB();
        ctx.replyWithHTML(`🦁 <b>مفتاح جديد:</b> <code>${key}</code>`);
    }
};
