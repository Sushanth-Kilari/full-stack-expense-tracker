require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const Expense = mongoose.model(
  "Expense",
  new mongoose.Schema(
    {
      title: { type: String, required: true, trim: true },
      amount: { type: Number, required: true, min: 0.01 },
      category: { type: String, default: "Other" },
    },
    { timestamps: true }
  )
);

app.get("/api/expenses", async (req, res) => {
  res.json(await Expense.find().sort({ createdAt: -1 }));
});

app.post("/api/expenses", async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/expenses/:id", async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!expense) return res.status(404).json({ error: "Expense not found" });
    res.json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/expenses/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "deleted" });
  } catch (err) {
    res.status(400).json({ error: "Invalid expense id" });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 5000, () => console.log("API running")))
  .catch((err) => console.error(err));
