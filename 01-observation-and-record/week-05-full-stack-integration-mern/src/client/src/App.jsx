import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/expenses";
const CATEGORIES = ["Food", "Travel", "Bills", "Shopping", "Other"];

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [error, setError] = useState("");

  const load = async () => setExpenses(await (await fetch(API)).json());

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!title.trim() || !(Number(amount) > 0)) {
      setError("Enter a title and a positive amount");
      return;
    }
    setError("");
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, amount: Number(amount), category }),
    });
    setTitle("");
    setAmount("");
    load();
  };

  const remove = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    load();
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div style={{ maxWidth: 480, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>ExpenseWise</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
      </select>
      <button onClick={add}>Add</button>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      <ul>
        {expenses.map((e) => (
          <li key={e._id}>
            {e.title} - Rs. {e.amount} ({e.category}){" "}
            <button onClick={() => remove(e._id)}>x</button>
          </li>
        ))}
      </ul>
      <h3>Total: Rs. {total}</h3>
    </div>
  );
}
