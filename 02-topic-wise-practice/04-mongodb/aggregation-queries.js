// Aggregation pipelines for the "expenses" collection.
// Run in mongosh:  load("aggregation-queries.js")   (after: use expense_tracker)

// 1. Total spent per category, biggest first
db.expenses.aggregate([
  { $group: { _id: "$category", total: { $sum: "$amount" }, count: { $sum: 1 } } },
  { $sort: { total: -1 } },
]);

// 2. Monthly totals
db.expenses.aggregate([
  {
    $group: {
      _id: { year: { $year: "$date" }, month: { $month: "$date" } },
      total: { $sum: "$amount" },
    },
  },
  { $sort: { "_id.year": 1, "_id.month": 1 } },
]);

// 3. Only Food and Travel, average amount
db.expenses.aggregate([
  { $match: { category: { $in: ["Food", "Travel"] } } },
  { $group: { _id: "$category", average: { $avg: "$amount" } } },
]);

// 4. Top 3 single expenses
db.expenses.aggregate([
  { $sort: { amount: -1 } },
  { $limit: 3 },
  { $project: { _id: 0, title: 1, amount: 1, category: 1 } },
]);
