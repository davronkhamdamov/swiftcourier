const { bot } = require('../core/bot');
const { messages } = require('../lib/message');
const { isUserActive } = require('./home');
const { User } = require('../db/users');

bot.start(async (ctx) => {
  const { id } = ctx.from;
  const getUser = await User.findOne({ user_id: id });
  if (getUser) {
    return isUserActive(ctx);
  }
  await ctx.reply(messages.start, {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Ro'yhattan o'tish",
          },
          {
            text: 'Adminga yozish ❓',
          },
        ],
      ],
      resize_keyboard: true,
    },
  });
});
