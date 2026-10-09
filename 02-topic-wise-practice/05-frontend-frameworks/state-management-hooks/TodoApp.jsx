import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

// Bills-to-pay checklist: list state, controlled input, derived values, custom hook
export default function TodoApp() {
  const [bills, setBills] = useLocalStorage("bills", []);
  const [text, setText] = useState("");

  const add = () => {
    if (!text.trim()) return;
    setBills([...bills, { id: Date.now(), text, paid: false }]);
    setText("");
  };

  const toggle = (id) =>
    setBills(bills.map((b) => (b.id === id ? { ...b, paid: !b.paid } : b)));

  const remove = (id) => setBills(bills.filter((b) => b.id !== id));

  const pending = bills.filter((b) => !b.paid).length;

  return (
    <div>
      <h3>Bills to pay ({pending} pending)</h3>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="e.g. Wi-Fi bill" />
      <button onClick={add}>Add</button>
      <ul>
        {bills.map((b) => (
          <li key={b.id} style={{ textDecoration: b.paid ? "line-through" : "none" }}>
            <input type="checkbox" checked={b.paid} onChange={() => toggle(b.id)} />
            {b.text} <button onClick={() => remove(b.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
