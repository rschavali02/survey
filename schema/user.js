const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hashed_password: { type: String, required: true },
  salt: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);