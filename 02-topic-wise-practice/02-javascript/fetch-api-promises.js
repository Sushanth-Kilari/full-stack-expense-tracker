// Promises and the Fetch API (run with Node 18+: node fetch-api-promises.js)
const API = "http://localhost:3000/api/expenses";

// 1. Creating a promise
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 2. Promise chaining with then / catch / finally
function getExpensesThen() {
  return fetch(API)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => console.log("then:", data.length, "expenses"))
    .catch((err) => console.error("then error:", err.message))
    .finally(() => console.log("then: done"));
}

// 3. async / await
async function addExpense(expense) {
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });
    const data = await res.json();
    console.log(res.status, data);
  } catch (err) {
    console.error("await error:", err.message);
  }
}

// 4. Promise.all - run requests in parallel
async function loadTwo() {
  const [a, b] = await Promise.all([fetch(`${API}/1`), fetch(`${API}/2`)]);
  console.log("parallel:", (await a.json()).title, "&", (await b.json()).title);
}

(async () => {
  await getExpensesThen();
  await wait(200);
  await addExpense({ title: "Coffee", amount: 120, category: "Food" });
  await loadTwo();
})();
