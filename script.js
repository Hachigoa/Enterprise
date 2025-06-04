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

// Login Navigation Bar No Longer Need To Logout
// === Utility Functions ===
function setCookie(name, value, days = 7) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}`;
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([.$?*|{}()\\[\\]\\\\\\/\\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function deleteCookie(name) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}

// === Update UI ===
function updateUI(username) {
  const welcomeMessage = document.getElementById("welcome-message");
  const logoutBtn = document.getElementById("logoutBtn");
  const openModal = document.getElementById("openModal");

  if (welcomeMessage) welcomeMessage.innerText = `Welcome back, ${username} 👋`;
  if (logoutBtn) logoutBtn.style.display = "inline-block";
  if (openModal) openModal.style.display = "none";
}

// === On Page Load ===
window.onload = () => {
  const isLoggedIn = getCookie("loggedIn");
  const username = getCookie("username");

  if (isLoggedIn === "true" && username) {
    updateUI(username);
  } else {
    const modal = document.getElementById("loginModal");
    if (modal) modal.style.display = "flex"; // Show login modal if not logged in
  }
};

// === DOM Content Loaded (Modal + Form Logic) ===
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("loginModal");
  const openModal = document.getElementById("openModal");
  const closeModal = document.getElementById("closeModal");
  const loginForm = document.getElementById("loginForm");
  const logoutBtn = document.getElementById("logoutBtn");

  if (openModal) {
    openModal.addEventListener("click", () => {
      if (modal) modal.style.display = "flex";
    });
  }

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      if (modal) modal.style.display = "none";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = e.target.email.value.trim();
      const password = e.target.password.value;

      const users = JSON.parse(localStorage.getItem("users") || "{}");

      if (users[email] && users[email].password === password) {
        setCookie("loggedIn", "true");
        setCookie("username", email);
        modal.style.display = "none";
        updateUI(email);
        location.reload(); // Force UI refresh across page
      } else {
        alert("Invalid email or password.");
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      deleteCookie("loggedIn");
      deleteCookie("username");
      location.href = "index.html"; // Redirect to home or login
    });
  }
});
