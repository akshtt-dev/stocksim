import mongoose from "mongoose";

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
  isAdded: {
    type: Boolean,
    default: false,
  },
});

const Crypto = mongoose.models.Crypto || mongoose.model("Crypto", cryptoSchema);

export default Crypto;
