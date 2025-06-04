// Index.js
const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

// Grab API_KEY from the environment
const apiKey = process.env.API_KEY;

// Parse JSON bodies
app.use(express.json());

// Health-check route
app.get("/", (req, res) => {
  res.send(`Hello from AI server! API Key is ${apiKey ? "set ✔️" : "missing ❌"}`);
});

// Example AI route: POST /ask { "prompt": "…" }
app.post("/ask", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Missing ‘prompt’ in request body" });
  }
  
  try {
    // Replace the URL below with your actual AI provider’s endpoint
    const aiResponse = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta2/models/​gemini-2.0-flash:generateText?key=YOUR_API_KEY",
      { prompt },
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    // Forward the AI’s answer back to the client
    return res.json({ answer: aiResponse.data.answer });
  } catch (err) {
    console.error("AI request failed:", err.response?.data || err.message);
    return res.status(500).json({ error: "AI request failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
