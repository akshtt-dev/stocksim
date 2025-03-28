import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  shortname: { type: String },
  symbol: { type: String, required: true, unique: true },
  quantity: { type: Number, default: 0 },
});

const stocksSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  shortname: { type: String },
  symbol: { type: String, required: true, unique: true },
  quantity: { type: Number, default: 0 },
});

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    userId: { type: String, required: true, unique: true },
    balance: { type: Number, default: 100 },
    lastClaimedDaily: { type: Date, default: null },
    crypto: [{ type: cryptoSchema, default: [] }],
    stocks: [{ type: stocksSchema, default: [] }],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
