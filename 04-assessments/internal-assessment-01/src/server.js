const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// POST /api/split  { total, people, tipPercent }
app.post("/api/split", (req, res) => {
  const total = Number(req.body.total);
  const people = Number(req.body.people);
  const tipPercent = Number(req.body.tipPercent ?? 0);

  if (!(total > 0)) return res.status(400).json({ error: "total must be a positive number" });
  if (!Number.isInteger(people) || people < 1) {
    return res.status(400).json({ error: "people must be a whole number of at least 1" });
  }
  if (!(tipPercent >= 0 && tipPercent <= 100)) {
    return res.status(400).json({ error: "tipPercent must be between 0 and 100" });
  }

  const tip = +(total * (tipPercent / 100)).toFixed(2);
  const grandTotal = +(total + tip).toFixed(2);
  const perPerson = +(grandTotal / people).toFixed(2);

  res.json({ total, tip, grandTotal, people, perPerson });
});

app.listen(PORT, () => console.log(`Split Bill app on http://localhost:${PORT}`));
