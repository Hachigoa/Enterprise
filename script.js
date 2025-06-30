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
function generateAIResponse(email, displayName) {
  const name = displayName || email;
  return `Hi ${name}, your latest stats show you're improving steadily. Keep hydrating and exercising! 🏋️‍♂️`;
}

// Show login modal with animation
openModal?.addEventListener("click", () => {
  modal.style.display = "flex";
  modal.style.opacity = "0";
  setTimeout(() => {
    modal.style.opacity = "1";
  }, 10);
});

// Close login modal with animation
function closeModalWithAnimation() {
  modal.style.opacity = "0";
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

closeModal?.addEventListener("click", closeModalWithAnimation);

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModalWithAnimation();
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
    sessionStorage.setItem("fromLogin", "true"); // for settings page

    // Show success animation
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '✓ Success!';
    submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';

    setTimeout(() => {
      closeModalWithAnimation();
      updateUI(email);
      document.getElementById('loginError').style.display = "none";
    }, 800);
  } else {
    document.getElementById('loginErrorText').innerText = "Invalid email or password.";
    const errorDiv = document.getElementById('loginError');
    errorDiv.style.display = "block";
    errorDiv.classList.add('shake');

    setTimeout(() => {
      errorDiv.classList.remove('shake');
    }, 500);
  }
});

// Logout
logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("loggedInUser");
  location.reload();
});

// Update UI when logged in with smooth animations
function updateUI(email) {
  const prefs = JSON.parse(localStorage.getItem(`prefs_${email}`)) || {};
  const displayName = prefs.displayName || email;

  if (welcomeMessage) {
    welcomeMessage.innerText = `Welcome back, ${displayName} 👋`;
    welcomeMessage.classList.add('fade-in');
  }

  if (aiResponse) {
    aiResponse.innerText = generateAIResponse(email, prefs.displayName);
    aiResponse.classList.add('slide-up');
  }

  // Apply dark mode if enabled
  if (prefs.darkMode) {
    document.body.classList.add("dark-mode");
  }

  // Animate elements appearance
  setTimeout(() => {
    if (userStats) {
      userStats.style.display = "block";
      userStats.classList.add('fade-in');
    }
  }, 300);

  if (openModal) {
    openModal.style.opacity = "0";
    setTimeout(() => {
      openModal.style.display = "none";
    }, 300);
  }

  if (logoutBtn) {
    logoutBtn.style.display = "inline-block";
    logoutBtn.classList.add('fade-in');
  }

  // Show AI section with animation
  if (aiSection) {
    setTimeout(() => {
      aiSection.style.display = "block";
      aiSection.classList.add('slide-up');
    }, 150);
  }

  // Hide home description with animation
  const homeDesc = document.getElementById('home-description');
  if (homeDesc) {
    homeDesc.style.opacity = "0";
    homeDesc.style.transform = "translateY(-20px)";
    setTimeout(() => {
      homeDesc.style.display = "none";
    }, 300);
  }
}

// AI message responder (use your real API endpoint)
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
  }

  // AI input handler with enhanced UX
  const aiSubmit = document.getElementById("ai-submit");
  const aiPrompt = document.getElementById("ai-prompt");

  if (aiSubmit && aiPrompt && aiResponse) {
    aiSubmit.addEventListener("click", async () => {
      const prompt = aiPrompt.value.trim();
      if (!prompt) {
        aiResponse.innerText = "Please enter a prompt.";
        aiResponse.style.borderColor = "#dc3545";
        setTimeout(() => {
          aiResponse.style.borderColor = "#dee2e6";
        }, 2000);
        return;
      }

      // Show loading state
      const originalBtnText = aiSubmit.innerHTML;
      aiSubmit.innerHTML = '<span class="loading">Thinking...</span>';
      aiSubmit.disabled = true;
      aiSubmit.style.opacity = "0.7";

      aiResponse.innerText = "🤖 Processing your request...";
      aiResponse.classList.add('loading');

      try {
        const answer = await getGeminiResponse(prompt);
        aiResponse.classList.remove('loading');
        aiResponse.innerText = answer;
        aiResponse.classList.add('fade-in');

        // Clear prompt after successful response
        aiPrompt.value = '';
      } catch (error) {
        aiResponse.classList.remove('loading');
        aiResponse.innerText = "❌ Sorry, there was an error processing your request. Please try again.";
        aiResponse.style.borderColor = "#dc3545";
      } finally {
        // Reset button state
        aiSubmit.innerHTML = originalBtnText;
        aiSubmit.disabled = false;
        aiSubmit.style.opacity = "1";
      }
    });

    // Allow Enter key to submit
    aiPrompt.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        aiSubmit.click();
      }
    });
  }
});