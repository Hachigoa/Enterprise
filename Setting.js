window.addEventListener("load", () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    // Only alert if not already redirected before
    const fromLogin = sessionStorage.getItem("fromLogin");
    if (!fromLogin) {
      alert("You must be logged in to access settings.");
    }
    window.location.href = "index.html";
    return;
  }

  // Clear the flag so alert works next time if needed
  sessionStorage.removeItem("fromLogin");

  // Load user prefs
  const prefs = JSON.parse(localStorage.getItem(`prefs_${loggedInUser}`)) || {};

  document.getElementById("displayName").value = prefs.displayName || "";

  if (prefs.darkMode) {
    document.body.classList.add("dark-mode");
    document.getElementById("darkModeToggle").checked = true;
  }

  document.getElementById("saveBtn").addEventListener("click", () => {
    const newPrefs = {
      displayName: document.getElementById("displayName").value.trim(),
      darkMode: document.getElementById("darkModeToggle").checked,
    };

    localStorage.setItem(`prefs_${loggedInUser}`, JSON.stringify(newPrefs));

    if (newPrefs.darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    alert("Settings saved!");
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });
});
