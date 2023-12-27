const { bot } = require('../core/bot');
const { Markup } = require('telegraf');
const { Category } = require('../db/category');
const { Product } = require('../db/products');
const { CategoryAction } = require('./actions');
const categoryData = Category.find();

bot.hears('Buyurtma berish 📦', (ctx) => {
  CategoryAction(ctx);
});

categoryData.find().then((data) => {
  data.map((e) => {
    bot.action(e.id, async (ctx) => {
      const FoundProduct = await Product.find({
        isChecked: true,
        category_id: ctx.match[0],
      });
      FoundProduct.map((e) => {
        ctx.telegram.sendPhoto(
          ctx.chat.id,
          { url: e.product_img },
          {
            caption: `Mahsulot nomi: ${e.title}\nMahsulot Haqida: ${e.description}\nNarx: ${e.price}\nMahsulot soni: ${e.product_count}`,
            reply_markup: Markup.inlineKeyboard([
              [
                Markup.button.callback('Buyurtma qilish ✅', e.id),
                Markup.button.callback(
                  'Boshqa toifani tanlash ❌',
                  'chooseAnother'
                ),
              ],
            ]).reply_markup,
          }
        );
      });
    });
  });
});

bot.action('chooseAnother', (ctx) => {
  CategoryAction(ctx);
});
