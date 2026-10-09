import { useState, useEffect } from "react";

// useState + useEffect: a daily expense counter that updates the page title
export default function Counter() {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(50);

  useEffect(() => {
    document.title = `${count} items - Rs. ${count * price}`;
  }, [count, price]);

  return (
    <div>
      <h3>Tea count: {count}</h3>
      <p>Cost: Rs. {count * price}</p>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <button onClick={() => setCount((c) => Math.max(0, c - 1))}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
    </div>
  );
}
