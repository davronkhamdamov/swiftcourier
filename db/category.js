const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
  title: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'Users' },
});

const Category = mongoose.model('category', CategorySchema);

module.exports = { Category };
