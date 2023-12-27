const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderedListSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, ref: 'products' },
  user_id: { type: Schema.Types.ObjectId, ref: 'users' },
});

const OrderedList = mongoose.model('orderedList', OrderedListSchema);

module.exports = { OrderedList };
