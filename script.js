const modal = document.getElementById("loginModal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const loginForm = document.getElementById("loginForm");
const logoutBtn = document.getElementById("logoutBtn");
const welcomeMessage = document.getElementById("welcome-message");
const aiResponse = document.getElementById("ai-response");
const userStats = document.getElementById("user-stats");

// Show login modal
openModal.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Close login modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Handle login
loginForm.addEventListener("submit", function (e) {
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
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("loggedInUser");
  location.reload();
});

// Update UI when logged in
function updateUI(email) {
  welcomeMessage.innerText = `Welcome back, ${email} 👋`;
  aiResponse.innerText = generateAIResponse(email);
  userStats.style.display = "block";
  openModal.style.display = "none";
  logoutBtn.style.display = "inline-block";
}

// Simulated AI response
function generateAIResponse(email) {
  return `Hi ${email}, your latest stats show you're improving steadily. Keep hydrating and exercising! 🏋️‍♂️`;
}

// On page load
window.addEventListener("load", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const email = localStorage.getItem("loggedInUser");

  if (isLoggedIn === "true" && email) {
    updateUI(email);
  }
});

// Ai Message Responder
async function getGeminiResponse(prompt) {
  const res = await fetch("", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  console.log(data);
}
// Update UI when logged in
function updateUI(email) {
  welcomeMessage.innerText = `Welcome back, ${email} 👋`;
  aiResponse.innerText = generateAIResponse(email);
  userStats.style.display = "block";
  openModal.style.display = "none";
  logoutBtn.style.display = "inline-block";
}

// Simulated AI response
function generateAIResponse(email) {
  return `Hi ${email}, your latest stats show you're improving steadily. Keep hydrating and exercising! 🏋️‍♂️`;
}

function updateUI(email) {
  if (welcomeMessage) {
    welcomeMessage.innerText = `Welcome back, ${email} 👋`;
  }

  if (aiResponse) {
    aiResponse.innerText = generateAIResponse(email);
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
}
