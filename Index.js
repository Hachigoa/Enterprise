// Index.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

// Grab API_KEY from the environment (must be set via GitHub secret or Render env var)
const apiKey = process.env.API_KEY;

// Enable CORS so your front end can call /ask
app.use(cors());
app.use(express.json());

// Health-check route (GET /)
app.get("/", (req, res) => {
  res.send(`Hello from AI server! API Key is ${apiKey ? "set ✔️" : "missing ❌"}`);
});

// POST /ask  ← front end will send { prompt: "..." }
app.post("/ask", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Missing 'prompt' in request body" });
  }

  if (!apiKey) {
    return res.status(500).json({ error: "Server error: API_KEY not configured" });
  }

  try {
    // Gemini REST endpoint for text generation
    const endpoint =
      `https://generativelanguage.googleapis.com/v1beta2/models/gemini-2.0-flash:generateText?key=${apiKey}`;

    // Send prompt in the required format: { prompt: { text: "..." } }
    const aiResponse = await axios.post(
      endpoint,
      { prompt: { text: prompt } },
      { headers: { "Content-Type": "application/json" } }
    );

    // Gemini returns an array of candidates. We take the first one's "output".
    const answer = aiResponse.data?.candidates?.[0]?.output;
    if (!answer) {
      return res.status(500).json({ error: "AI returned no output" });
    }

    return res.json({ answer });
  } catch (err) {
    console.error("Error calling Gemini:", err.response?.data || err.message);
    return res
      .status(500)
      .json({ error: "AI request failed", details: err.response?.data });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

