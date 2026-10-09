const express = require("express");
const router = express.Router();

let expenses = [
  { id: 1, title: "Groceries", amount: 850, category: "Food" },
  { id: 2, title: "Metro card recharge", amount: 500, category: "Travel" },
];
let nextId = 3;

router.get("/expenses", (req, res) => res.json(expenses));

router.get("/expenses/:id", (req, res) => {
  const e = expenses.find((x) => x.id === Number(req.params.id));
  if (!e) return res.status(404).json({ error: "Expense not found" });
  res.json(e);
});

router.post("/expenses", (req, res) => {
  const { title, amount, category } = req.body;
  if (!title || !(Number(amount) > 0) || !category) {
    return res.status(400).json({ error: "title, category and a positive amount required" });
  }
  const expense = { id: nextId++, title, amount: Number(amount), category };
  expenses.push(expense);
  res.status(201).json(expense);
});

module.exports = router;
