// A server with only Node's built-in http module (no Express)
const http = require("http");

const expenses = [
  { id: 1, title: "Groceries", amount: 850 },
  { id: 2, title: "Metro card", amount: 500 },
];

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("Hello from the Node http module");
  }

  if (req.method === "GET" && req.url === "/expenses") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(expenses));
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(3000, () => console.log("http server on port 3000"));
