const mongoose = require('mongoose');

// user schema
const userScheama = new mongoose.Schema(
  {
    face: String,
    data: Object,
    image: String
  },
  { timestamps: true }
);



module.exports = mongoose.model('User', userScheama); 