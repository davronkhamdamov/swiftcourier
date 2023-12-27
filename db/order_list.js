const mongoose = require('mongoose');
const { Schema } = mongoose;

const LocationSchema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});
const OrderListSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, ref: 'product' },
  location: { type: LocationSchema },
  status: { type: String, default: 'Buyurtmagiz tayyorlanmoqda...' },
  delivery_time: { type: 'string', required: false },
  user_id: { type: Number, required: true },
});

const Order = mongoose.model('orderList', OrderListSchema);

module.exports = { Order };
