const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  product_img: { type: String, required: true },
  price: { type: Number, required: true },
  product_count: { type: Number, required: true },
  isChecked: { type: Boolean, default: false },
  category_id: { type: Schema.Types.ObjectId, ref: 'category' },
});

const Product = mongoose.model('product', ProductSchema);

module.exports = { Product };

async function foo() {
  const product = new Product({
    title: 'Lavash oddiy',
    description:
      'Fastfood lavashimiz bilan tez va mazali taomlardan zavqlaning! Tasavvur qiling-a, yumshoq va egiluvchan' +
      " lavash nonini mahorat bilan to'ldirib, mukammallikka aylantirib, qulay qo'lda ziyofat yaratadi.",
    product_img:
      'https://www.californialavash.com/wp-content/uploads/2014/04/lavash-right-img.png',
    price: 20000,
    product_count: 10,
    isChecked: true,
    category_id: '658b56834f35fec8cfaf13d7',
  });
  await product.save();
}
// foo();
