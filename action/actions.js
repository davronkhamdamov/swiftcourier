const { Category } = require('../db/category');
const { Markup } = require('telegraf');
const Actions = async (ctx) => {
  const categoryData = await Category.find();
  await ctx.replyWithHTML(
    "Buyurtma bermoqchi bo'lgan narsangizni toifasini tanlang:",
    Markup.inlineKeyboard(
      categoryData.map((e) => {
        return [Markup.button.callback(e.title, e.id)];
      })
    )
  );
};
module.exports = { CategoryAction: Actions };
