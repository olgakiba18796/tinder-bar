// Aleksandr Ivanov
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: String,
  email: String,
  email: String,
  password: String,
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  }
},
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Person', personSchema);
