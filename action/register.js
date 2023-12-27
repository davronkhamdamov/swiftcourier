const { bot } = require('../core/bot');
const { isUserActive } = require('./home');
const { User } = require('../db/users');
const { Markup } = require('telegraf');

const keyboard = Markup.inlineKeyboard([
  [
    Markup.button.callback('Ha ✅', 'yes'),
    Markup.button.callback("Yo'q ❌", 'no'),
  ],
]);
bot.hears("Ro'yhattan o'tish", async (ctx) => {
  await ctx.reply("Ro'yhattan o'tish uchun telefon raqamingizni jo'nating 📤", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Telefon raqamni jo'natish 📱",
            request_contact: true,
          },
        ],
      ],
      resize_keyboard: true,
    },
  });
});

bot.on('contact', (ctx) => {
  const phone_number = ctx.message.contact.phone_number;
  if (phone_number) {
    ctx.replyWithHTML('Ism Familyangizni kiriting', {
      reply_markup: { remove_keyboard: true },
    });
    bot.on('text', async (ctx) => {
      const user = await User.findOne({ user_id: ctx.from.id });
      if (!user) {
        const full_name = ctx.message.text;
        ctx.reply(
          `Hammasi tog'rimi:\n\nFoydalanuvchi ma'lumotlari\nIsmingiz: ${full_name}\nTelefon raqami 📞: +${phone_number}`,
          keyboard
        );
        bot.action('yes', async (ctx) => {
          const newUser = new User({
            first_name: full_name,
            phone_number,
            user_id: ctx.from.id,
          });
          await newUser.save();
          await ctx.replyWithHTML(
            "Muvaffaqiyatli ro'yxatdan o'tgangiz bilan tabriklayman 🥳"
          );
          await isUserActive(ctx);
        });
        bot.action('no', async (ctx) => {
          await ctx.replyWithHTML(
            "Unaqa bo'lsa boshqattan ism familyangizni kiriting"
          );
        });
      }
    });
  }
});
