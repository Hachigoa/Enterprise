const express = require('express');
const fetch = require('node-fetch'); // npm install node-fetch
const cors = require('cors');
const app = express();
const PORT = 3000;

// Allow requests from your frontend
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = 'sk-REPLACE_ME'; // <-- Put your OpenAI API key here

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: userMessage }]
            })
        });
        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't answer.";
        res.json({ reply });
    } catch (error) {
        res.status(500).json({ reply: "Error contacting AI service." });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
