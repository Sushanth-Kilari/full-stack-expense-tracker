require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const Goal = require("./models/Goal");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// list all goals
app.get("/api/goals", async (req, res) => {
  res.json(await Goal.find().sort({ createdAt: -1 }));
});

// create a goal
app.post("/api/goals", async (req, res) => {
  try {
    res.status(201).json(await Goal.create(req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// add money to a goal ($inc keeps the update atomic)
app.patch("/api/goals/:id/deposit", async (req, res) => {
  const amount = Number(req.body.amount);
  if (!(amount > 0)) return res.status(400).json({ error: "amount must be positive" });
  try {
    const goal = await Goal.findByIdAndUpdate(
      req.params.id,
      { $inc: { saved: amount } },
      { new: true }
    );
    if (!goal) return res.status(404).json({ error: "Goal not found" });
    res.json(goal);
  } catch (err) {
    res.status(400).json({ error: "Invalid goal id" });
  }
});

// delete a goal
app.delete("/api/goals/:id", async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) return res.status(404).json({ error: "Goal not found" });
    res.json({ message: "Goal deleted" });
  } catch (err) {
    res.status(400).json({ error: "Invalid goal id" });
  }
});

// overall progress using an aggregation pipeline
app.get("/api/stats", async (req, res) => {
  const [stats] = await Goal.aggregate([
    { $group: { _id: null, goals: { $sum: 1 }, target: { $sum: "$target" }, saved: { $sum: "$saved" } } },
    { $project: { _id: 0, goals: 1, target: 1, saved: 1 } },
  ]);
  res.json(stats || { goals: 0, target: 0, saved: 0 });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 5000, () => console.log("Savings Goals API running")))
  .catch((err) => console.error("MongoDB connection failed:", err.message));
