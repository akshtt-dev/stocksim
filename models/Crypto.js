const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  shortname: {
    type: String,
    unique: true,
  },
  symbol: {
    type: String,
    unique: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Crypto = mongoose.model("Crypto", cryptoSchema);

module.exports = Crypto;
