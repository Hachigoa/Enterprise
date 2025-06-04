const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const apiKey = process.env.API_KEY; 

app.get("/", (req, res) => {
  res.send(`Hello from AI server! API Key is ${apiKey ? "set ✔️" : "missing ❌"}`);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

