 // Wait for page load
    window.addEventListener("load", () => {
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (!loggedInUser) {
        alert("You must be logged in to access settings.");
        window.location.href = "index.html"; // Redirect if not logged in
        return;
      }

      // Load user prefs
      const prefs = JSON.parse(localStorage.getItem(`prefs_${loggedInUser}`)) || {};

      // Set display name
      document.getElementById("displayName").value = prefs.displayName || "";

      // Set dark mode toggle & apply theme
      if (prefs.darkMode) {
        document.body.classList.add("dark-mode");
        document.getElementById("darkModeToggle").checked = true;
      }

      // Save button
      document.getElementById("saveBtn").addEventListener("click", () => {
        const newPrefs = {
          displayName: document.getElementById("displayName").value.trim(),
          darkMode: document.getElementById("darkModeToggle").checked
        };

        localStorage.setItem(`prefs_${loggedInUser}`, JSON.stringify(newPrefs));

        if (newPrefs.darkMode) {
          document.body.classList.add("dark-mode");
        } else {
          document.body.classList.remove("dark-mode");
        }

        alert("Settings saved!");
      });

      // Logout button
      document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html"; // Redirect to homepage or login page
      });
    });
