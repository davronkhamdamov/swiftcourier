const keyboard = {
  reply_markup: {
    keyboard: [
      [
        {
          text: 'Buyurtma berish 📦',
        },
      ],
      [
        {
          text: "️Kuryerga savol yo'llash ❓",
        },
        {
          text: 'Buyurtma holatini tekshirish',
        },
      ],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};

module.exports = { keyboard };
