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

// Cookie Login
function loginUser(username) {
    // Set a cookie that expires in 7 days
    document.cookie = `loggedIn=true; path=/; max-age=${7*24*60*60}`;
    document.cookie = `username=${encodeURIComponent(username)}; path=/; max-age=${7*24*60*60}`;
    // Redirect or update UI as needed
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([$?*|{}\]\\^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function checkLogin() {
    if (getCookie('loggedIn') === 'true') {
        // User is logged in
        showDashboard();
    } else {
        // Not logged in
        showLoginForm();
    }
}

window.onload = checkLogin;

function logoutUser() {
    // Remove cookies by setting expiration in past
    document.cookie = "loggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    // Redirect or update UI as needed
    location.href = '/login.html';
}
