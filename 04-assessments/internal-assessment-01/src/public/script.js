const form = document.getElementById("splitForm");
const errorEl = document.getElementById("error");
const resultEl = document.getElementById("result");

const money = (n) => `Rs. ${n.toFixed(2)}`;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorEl.textContent = "";
  resultEl.hidden = true;

  const payload = {
    total: document.getElementById("total").value,
    people: document.getElementById("people").value,
    tipPercent: document.getElementById("tip").value || 0,
  };

  try {
    const res = await fetch("/api/split", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    document.getElementById("rTotal").textContent = money(data.total);
    document.getElementById("rTip").textContent = money(data.tip);
    document.getElementById("rGrand").textContent = money(data.grandTotal);
    document.getElementById("rEach").textContent = money(data.perPerson);
    resultEl.hidden = false;
  } catch (err) {
    errorEl.textContent = err.message;
  }
});
