const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 5000;

// Load API Key from environment variables
const apiKey = process.env.API_KEY;

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static('.'));

// Health check
app.get("/", (req, res) => {
  res.send(`Hello from AI server! API Key is ${apiKey ? "set ✔️" : "missing ❌"}`);
});

// Handle signup form submission
app.post("/signup", (req, res) => {
  console.log("Signup request received:", req.body);

  const { firstName, lastName, email, password, ageRange, terms, newsletter } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !password || !ageRange || !terms) {
    console.log("Validation failed - missing required fields");
    return res.status(400).json({ 
      success: false, 
      error: "All required fields must be filled" 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      error: "Please enter a valid email address" 
    });
  }

  // Password validation
  if (password.length < 8) {
    return res.status(400).json({ 
      success: false, 
      error: "Password must be at least 8 characters long" 
    });
  }

  console.log("Signup successful for:", email);

  // In a real app, you'd save to a database
  // For now, just return success
  res.json({ 
    success: true, 
    message: "Account created successfully!" 
  });
});

// POST /ask - expects { "prompt": "..." }
app.post("/ask", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Missing 'prompt' in request body" });
  }

  if (!apiKey) {
    return res.status(500).json({ error: "Server error: API_KEY not configured" });
  }

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await axios.post(
      endpoint,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const answer = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini";
    return res.json({ answer });

  } catch (err) {
    console.error("Error calling Gemini:", err.response?.data || err.message);
    return res.status(500).json({ error: "AI request failed", details: err.response?.data });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});