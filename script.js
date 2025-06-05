const modal = document.getElementById("loginModal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const loginForm = document.getElementById("loginForm");
const logoutBtn = document.getElementById("logoutBtn");
const welcomeMessage = document.getElementById("welcome-message");
const aiResponse = document.getElementById("ai-response");
const userStats = document.getElementById("user-stats");
const aiSection = document.getElementById("ai-section");

// Simulated AI welcome message
function generateAIResponse(email) {
  return `Hi ${email}, your latest stats show you're improving steadily. Keep hydrating and exercising! 🏋️‍♂️`;
}

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
  welcomeMessage.innerText = `Welcome back, ${email} 👋`;

  if (aiResponse) {
    aiResponse.innerText = generateAIResponse(email);
  }

  userStats.style.display = "block";
  openModal.style.display = "none";
  logoutBtn.style.display = "inline-block";
  if (aiSection) aiSection.style.display = "block";
}

// AI message responder (replace with real API if needed)
async function getGeminiResponse(prompt) {
  try {
    const res = await fetch("https://enterprise-zc5x.onrender.com/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    return data.answer || "No answer returned.";
  } catch (err) {
    console.error("Error talking to AI:", err);
    return "AI error. Try again.";
  }
}

// On page load
window.addEventListener("load", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const email = localStorage.getItem("loggedInUser");

  if (isLoggedIn === "true" && email) {
    updateUI(email);
  } else {
    if (aiSection) aiSection.style.display = "none";
  }

  const aiSubmit = document.getElementById("ai-submit");
  const aiPrompt = document.getElementById("ai-prompt");

  if (aiSubmit && aiPrompt && aiResponse) {
    aiSubmit.addEventListener("click", async () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const email = localStorage.getItem("loggedInUser");

      if (isLoggedIn !== "true" || !email) {
        aiResponse.innerText = "❌ Please log in to use the AI.";
        return;
      }

      const prompt = aiPrompt.value.trim();
      if (!prompt) {
        aiResponse.innerText = "Please enter a prompt.";
        return;
      }

      aiResponse.innerText = "Thinking… 🤖";
      const answer = await getGeminiResponse(prompt);
      aiResponse.innerText = answer;
    });
  }
});

  // Clear flag for future visits
  sessionStorage.removeItem("fromLogin");

  // Load user preferences
  const prefs = JSON.parse(localStorage.getItem(`prefs_${loggedInUser}`)) || {};

  // Set display name field
  const displayNameInput = document.getElementById("displayName");
  if (displayNameInput) {
    displayNameInput.value = prefs.displayName || "";
  }

  // Set dark mode toggle
  const darkModeToggle = document.getElementById("darkModeToggle");
  if (prefs.darkMode) {
    document.body.classList.add("dark-mode");
    if (darkModeToggle) darkModeToggle.checked = true;
  }

  // Save button event
  const saveBtn = document.getElementById("saveBtn");
  saveBtn?.addEventListener("click", () => {
    const newPrefs = {
      displayName: displayNameInput?.value.trim() || "",
      darkMode: darkModeToggle?.checked || false,
    };

    localStorage.setItem(`prefs_${loggedInUser}`, JSON.stringify(newPrefs));

    if (newPrefs.darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    alert("Settings saved!");
  });

  // Optional: Save on Enter key in displayName input
  displayNameInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveBtn?.click();
    }
  });
