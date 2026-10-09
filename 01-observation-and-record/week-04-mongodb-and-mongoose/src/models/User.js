const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    monthlyBudget: { type: Number, min: 0, default: 0 },
    currency: { type: String, enum: ["INR", "USD", "EUR"], default: "INR" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
