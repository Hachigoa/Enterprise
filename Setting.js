window.addEventListener("load", () => {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    const fromLogin = sessionStorage.getItem("fromLogin");
    if (!fromLogin) {
      alert("You must be logged in to access settings.");
    }
    window.location.href = "index.html";
    return;
  }

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

  // Logout button
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });
});
// Check
