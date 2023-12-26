const { bot } = require("../core/bot");
const {messages} = require("../lib/message");

bot.start(async (ctx) => {
    await ctx.reply(messages.start, {
        reply_markup: {
            keyboard: [
                [
                    {
                        text: "Buyurtma berish 📦",
                    },
                    {
                        text: "Adminga yozish ❓",
                    },
                ],
            ],
            resize_keyboard: true,
        },
    });
});
