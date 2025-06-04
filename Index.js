// Index.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (or restrict to your domain)
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send(`Hello from AI server! API Key is ${process.env.API_KEY ? "set ✔️" : "missing ❌"}`);
});

// POST /ask  ← your frontend will hit this
app.post("/ask", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt in request body" });
  }

  // Read your secret from process.env.API_KEY
  const key = process.env.API_KEY;
  if (!key) {
    return res.status(500).json({ error: "Server API_KEY is not set" });
  }

  try {
    // Gemini REST endpoint, with your key as query param
    const endpoint = `https://generativelanguage.googleapis.com/v1beta2/models/gemini-2.0-flash:generateText?key=${key}`;

    const aiResponse = await axios.post(
      endpoint,
      { prompt: { text: prompt } },
      { headers: { "Content-Type": "application/json" } }
    );

    // Gemini puts the generated text in data.candidates[0].output
    const answer = aiResponse.data?.candidates?.[0]?.output;
    return res.json({ answer });
  } catch (err) {
    console.error("Error calling Gemini:", err.response?.data || err.message);
    return res.status(500).json({ error: "AI request failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

