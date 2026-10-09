// Array methods and ES6 features on an expense list
const expenses = [
  { title: "Groceries", amount: 850, category: "Food" },
  { title: "Metro card", amount: 500, category: "Travel" },
  { title: "Electricity", amount: 1320, category: "Bills" },
  { title: "Lunch", amount: 180, category: "Food" },
];

// map - extract titles
const titles = expenses.map(({ title }) => title);

// filter - only food
const food = expenses.filter((e) => e.category === "Food");

// reduce - total, and total per category
const total = expenses.reduce((sum, e) => sum + e.amount, 0);
const byCategory = expenses.reduce((acc, { category, amount }) => {
  acc[category] = (acc[category] || 0) + amount;
  return acc;
}, {});

// find / some / every
const firstBig = expenses.find((e) => e.amount > 1000);
const hasTravel = expenses.some((e) => e.category === "Travel");
const allPositive = expenses.every((e) => e.amount > 0);

// spread, sort (on a copy) and template literals
const sorted = [...expenses].sort((a, b) => b.amount - a.amount);

console.log(`Titles: ${titles.join(", ")}`);
console.log("Food items:", food.length);
console.log(`Total: ${total}`);
console.log("By category:", byCategory);
console.log("First big expense:", firstBig.title);
console.log("Has travel:", hasTravel, "| All positive:", allPositive);
console.log("Highest:", sorted[0].title);
