const express = require("express");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// simple logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => res.send("ExpenseWise API is running"));
app.use("/api", apiRoutes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
