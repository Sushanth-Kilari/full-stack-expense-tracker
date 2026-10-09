// ---------- DOM manipulation ----------
const descInput = document.getElementById("descInput");
const amountInput = document.getElementById("amountInput");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const totalEl = document.getElementById("total");

let expenses = [];

const render = () => {
  expenseList.innerHTML = "";
  expenses.forEach(({ id, desc, amount }) => {
    const li = document.createElement("li");
    li.textContent = `${desc} - Rs. ${amount}`;

    const del = document.createElement("button");
    del.textContent = "x";
    del.addEventListener("click", () => {
      expenses = expenses.filter((e) => e.id !== id);
      render();
    });

    li.appendChild(del);
    expenseList.appendChild(li);
  });

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  totalEl.textContent = `Total: Rs. ${total}`;
};

const addExpense = () => {
  const desc = descInput.value.trim();
  const amount = Number(amountInput.value);
  if (!desc || !(amount > 0)) return;

  expenses.push({ id: Date.now(), desc, amount });
  descInput.value = "";
  amountInput.value = "";
  render();
};

addBtn.addEventListener("click", addExpense);

// ---------- Async / fetch ----------
const loadBtn = document.getElementById("loadBtn");
const friendList = document.getElementById("friendList");

async function loadFriends() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const users = await res.json();
    friendList.innerHTML = users
      .map(({ name, email }) => `<li>${name} - ${email}</li>`)
      .join("");
  } catch (err) {
    friendList.innerHTML = `<li>Error: ${err.message}</li>`;
  }
}

loadBtn.addEventListener("click", loadFriends);
