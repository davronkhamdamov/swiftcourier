const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  user_id: { type: Number, required: true },
  phone_number: { type: Number, required: true },
  id_admin: { type: Boolean, default: false },
});

const User = mongoose.model('users', UserSchema);

module.exports = { User };
