const express = require("express");
const app = express();
app.use(express.json());

let expenses = [{ id: 1, title: "Groceries", amount: 850 }];
let nextId = 2;

app.get("/expenses", (req, res) => res.json(expenses));

app.post("/expenses", (req, res) => {
  const { title, amount } = req.body;
  if (!title || !(Number(amount) > 0)) return res.sendStatus(400);
  const expense = { id: nextId++, title, amount: Number(amount) };
  expenses.push(expense);
  res.status(201).json(expense);
});

app.put("/expenses/:id", (req, res) => {
  const expense = expenses.find((e) => e.id === +req.params.id);
  if (!expense) return res.sendStatus(404);
  expense.title = req.body.title ?? expense.title;
  expense.amount = req.body.amount ?? expense.amount;
  res.json(expense);
});

app.delete("/expenses/:id", (req, res) => {
  expenses = expenses.filter((e) => e.id !== +req.params.id);
  res.sendStatus(204);
});

app.listen(3000, () => console.log("CRUD API on 3000"));
