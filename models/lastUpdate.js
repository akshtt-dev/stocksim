const mongoose = require("mongoose");

const lastUpdateSchema = new mongoose.Schema({
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
});

const LastUpdate = mongoose.model("LastUpdate", lastUpdateSchema);

module.exports = LastUpdate;