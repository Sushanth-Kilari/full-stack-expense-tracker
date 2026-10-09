const express = require("express");
const app = express();

// 1. Application-level middleware (runs for every request)
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(`[${req.requestTime}] ${req.method} ${req.url}`);
  next();
});

// 2. Built-in middleware
app.use(express.json());

// 3. Route-level middleware
const requireApiKey = (req, res, next) => {
  if (req.get("x-api-key") !== "demo-key") {
    return res.status(401).json({ error: "Missing or invalid API key" });
  }
  next();
};

app.get("/public", (req, res) => res.json({ message: "Anyone can see this" }));
app.get("/private", requireApiKey, (req, res) =>
  res.json({ message: "Secret expense report", at: req.requestTime })
);

// 4. Error-handling middleware (four arguments, registered last)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(3000, () => console.log("Middleware demo on 3000"));
