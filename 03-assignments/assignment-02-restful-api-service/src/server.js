const express = require("express");
const app = express();
app.use(express.json());

const CATEGORIES = ["Food", "Travel", "Bills", "Shopping", "Other"];

let expenses = [
  { id: 1, title: "Groceries", amount: 850, category: "Food", date: "2026-10-08" },
  { id: 2, title: "Metro card recharge", amount: 500, category: "Travel", date: "2026-10-07" },
];
let nextId = 3;

// Returns an error message, or null when the body is valid
function validate({ title, amount, category }, partial = false) {
  if (!partial || title !== undefined) {
    if (typeof title !== "string" || !title.trim()) return "title is required";
  }
  if (!partial || amount !== undefined) {
    if (!(Number(amount) > 0)) return "amount must be a positive number";
  }
  if (category !== undefined && !CATEGORIES.includes(category)) {
    return `category must be one of: ${CATEGORIES.join(", ")}`;
  }
  return null;
}

// GET all (supports ?category= and ?min= filters)
app.get("/expenses", (req, res) => {
  const { category, min } = req.query;
  let result = expenses;
  if (category) result = result.filter((e) => e.category === category);
  if (min) result = result.filter((e) => e.amount >= Number(min));
  res.json(result);
});

// GET summary - total per category (declared before /:id)
app.get("/expenses/summary", (req, res) => {
  const summary = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});
  res.json({ total: expenses.reduce((s, e) => s + e.amount, 0), byCategory: summary });
});

// GET one
app.get("/expenses/:id", (req, res) => {
  const expense = expenses.find((e) => e.id === +req.params.id);
  expense ? res.json(expense) : res.status(404).json({ error: "Expense not found" });
});

// POST
app.post("/expenses", (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).json({ error });
  const { title, amount, category = "Other", date } = req.body;
  const expense = {
    id: nextId++,
    title: title.trim(),
    amount: Number(amount),
    category,
    date: date || new Date().toISOString().slice(0, 10),
  };
  expenses.push(expense);
  res.status(201).json(expense);
});

// PUT
app.put("/expenses/:id", (req, res) => {
  const expense = expenses.find((e) => e.id === +req.params.id);
  if (!expense) return res.status(404).json({ error: "Expense not found" });
  const error = validate(req.body, true);
  if (error) return res.status(400).json({ error });
  const { title, amount, category, date } = req.body;
  if (title !== undefined) expense.title = title.trim();
  if (amount !== undefined) expense.amount = Number(amount);
  if (category !== undefined) expense.category = category;
  if (date !== undefined) expense.date = date;
  res.json(expense);
});

// DELETE
app.delete("/expenses/:id", (req, res) => {
  const index = expenses.findIndex((e) => e.id === +req.params.id);
  if (index === -1) return res.status(404).json({ error: "Expense not found" });
  expenses.splice(index, 1);
  res.sendStatus(204);
});

app.listen(3000, () => console.log("Expense API on http://localhost:3000"));
