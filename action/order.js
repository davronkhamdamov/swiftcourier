const { bot } = require('../core/bot');
const { Product } = require('../db/products');
const Products = Product.find();
const { Order } = require('../db/order_list');
const { isUserActive } = require('./home');

Products.then((data) => {
  data.forEach((item) => {
    bot.action(item.id, async (ctx) => {
      await ctx.replyWithHTML(
        "Mahsulotni buyurtma qilish uchun ma'lumotlaringzini kirting"
      );
      await ctx.replyWithHTML('Telefon raqamingiz:');
      bot.on('text', (ctx) => {
        const phoneNumber = ctx.message.text;
        ctx.telegram.sendMessage(
          ctx.chat.id,
          'Buyurtmani yetkazish uchun lakatsiyangizni tashlang',
          {
            reply_markup: {
              keyboard: [
                [
                  {
                    text: 'Lakatsiyaingizni tashlang',
                    request_location: true,
                  },
                ],
              ],
              resize_keyboard: true,
            },
          }
        );
        bot.on('location', async (ctx) => {
          const { latitude, longitude } = ctx.message.location;
          const newOrder = new Order({
            product_id: item.id,
            location: { latitude, longitude },
            user_id: ctx.from.id,
          });
          await newOrder.save();
          await ctx.replyWithHTML(newOrder.status);
          await isUserActive(ctx);
        });
      });
    });
  });
});
