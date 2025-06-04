const modal = document.getElementById("loginModal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const loginForm = document.getElementById("loginForm");
const logoutBtn = document.getElementById("logoutBtn");
const welcomeMessage = document.getElementById("welcome-message");
const aiResponse = document.getElementById("ai-response");
const userStats = document.getElementById("user-stats");

// Show login modal
openModal?.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Close login modal
closeModal?.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Handle login
loginForm?.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = e.target.email.value.trim();
  const password = e.target.password.value;

  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[email] && users[email].password === password) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loggedInUser", email);
    modal.style.display = "none";
    updateUI(email);
  } else {
    alert("Invalid email or password.");
  }
});

// Logout
logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("loggedInUser");
  location.reload();
});

// Update UI when logged in
function updateUI(email) {
  if (welcomeMessage) {
    welcomeMessage.innerText = `Welcome back, ${email} 👋`;
  }

  if (userStats) {
    userStats.style.display = "block";
  }

  if (openModal) {
    openModal.style.display = "none";
  }

  if (logoutBtn) {
    logoutBtn.style.display = "inline-block";
  }

  const loginBtn = document.getElementById("openModal");
  if (loginBtn) {
    loginBtn.style.display = "none";
  }

  // Optional: show AI welcome
  if (aiResponse) {
    aiResponse.innerText = `Hi ${email}, your latest stats show you're improving steadily. Keep hydrating and exercising! 🏋️‍♂️`;
  }
}

// Ask AI function
async function askAI(promptText) {
  try {
    const BASE_URL = "https://enterprise-zc5x.onrender.com"; // Replace if needed
    const response = await fetch(`${BASE_URL}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: promptText })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Backend error:", data.error);
      return `Error: ${data.error}`;
    }

    return data.answer;
  } catch (err) {
    console.error("Network error:", err);
    return "Network error. See console.";
  }
}

// Unified load event
window.addEventListener("load", () => {
  // Check login state
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const email = localStorage.getItem("loggedInUser");

  if (isLoggedIn === "true" && email) {
    updateUI(email);
  }

  // Setup AI interaction
  const aiSubmit = document.getElementById("ai-submit");
  const aiPrompt = document.getElementById("ai-prompt");

  if (aiSubmit && aiPrompt && aiResponse) {
    aiSubmit.addEventListener("click", async () => {
      const text = aiPrompt.value.trim();
      if (!text) {
        aiResponse.innerText = "Please type a prompt first.";
        return;
      }

      aiResponse.innerText = "Thinking… 🤖";
      const answer = await askAI(text);
      aiResponse.innerText = answer;
    });
  }
});
