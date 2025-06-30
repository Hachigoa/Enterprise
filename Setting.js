window.addEventListener("load", () => {
  const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';

  if (!isLoggedIn) {
    // Show not-logged-in message instead of alert
    const notLoggedInMsg = document.getElementById('not-logged-in-message');
    const settingsContainer = document.getElementById('settings-container');
    
    if (notLoggedInMsg) notLoggedInMsg.style.display = 'block';
    if (settingsContainer) settingsContainer.style.display = 'none';
    return;
  }

  // Hide not-logged-in message if user is logged in
  const notLoggedInMsg = document.getElementById('not-logged-in-message');
  if (notLoggedInMsg) notLoggedInMsg.style.display = 'none';

    // Clear flag for future visits
  sessionStorage.removeItem("fromLogin");

  // Load user preferences
  const prefs = JSON.parse(localStorage.getItem('userPrefs')) || {};

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

    localStorage.setItem('userPrefs', JSON.stringify(newPrefs));

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
    sessionStorage.removeItem('loggedIn');
    window.location.href = "index.html";
  });
});
// Check
