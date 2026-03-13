const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  userName: { type: String, default: "Explorateur UM6P" },
  rating: { type: Number, default: 5 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Feedback", feedbackSchema);