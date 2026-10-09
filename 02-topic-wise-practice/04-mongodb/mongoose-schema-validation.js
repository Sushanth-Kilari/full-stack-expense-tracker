// Schema validation rules with Mongoose (no database connection needed)
const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Title is required"], trim: true, minlength: 2 },
  amount: {
    type: Number,
    required: true,
    min: [0.01, "Amount must be positive"],
    validate: {
      validator: (v) => Number.isFinite(v),
      message: "Amount must be a number",
    },
  },
  category: {
    type: String,
    enum: { values: ["Food", "Travel", "Bills", "Shopping", "Other"], message: "{VALUE} is not a valid category" },
    default: "Other",
  },
  email: { type: String, match: [/^\S+@\S+\.\S+$/, "Invalid email"], lowercase: true },
});

const Expense = mongoose.model("Expense", expenseSchema);

const good = new Expense({ title: "Lunch", amount: 150, category: "Food" });
console.log("valid doc errors:", good.validateSync());

const bad = new Expense({ title: "x", amount: -5, category: "Gold" });
const err = bad.validateSync();
Object.values(err.errors).forEach((e) => console.log("-", e.message));
