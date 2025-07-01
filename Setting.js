
// Theme color application function
function applyThemeColor(theme) {
  const root = document.documentElement;
  
  switch(theme) {
    case 'green':
      root.style.setProperty('--primary-color', '#2e7d32');
      root.style.setProperty('--secondary-color', '#4caf50');
      root.style.setProperty('--accent-color', '#c8e6c9');
      break;
    case 'purple':
      root.style.setProperty('--primary-color', '#6a1b9a');
      root.style.setProperty('--secondary-color', '#9c27b0');
      root.style.setProperty('--accent-color', '#e1bee7');
      break;
    case 'orange':
      root.style.setProperty('--primary-color', '#e65100');
      root.style.setProperty('--secondary-color', '#ff9800');
      root.style.setProperty('--accent-color', '#ffe0b2');
      break;
    default:
      root.style.setProperty('--primary-color', '#2b7a78');
      root.style.setProperty('--secondary-color', '#3aafa9');
      root.style.setProperty('--accent-color', '#def2f1');
  }
}


window.addEventListener("load", () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

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
  const loggedInUser = localStorage.getItem('loggedInUser');
  const prefs = JSON.parse(localStorage.getItem(`prefs_${loggedInUser}`)) || {};

  // Set email field (readonly)
  const emailInput = document.getElementById("emailAddress");
  if (emailInput) {
    emailInput.value = loggedInUser || "";
  }

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

  // Set theme color
  const themeColorSelect = document.getElementById("themeColor");
  if (themeColorSelect) {
    themeColorSelect.value = prefs.themeColor || "default";
    applyThemeColor(prefs.themeColor || "default");
  }

  // Set notification preferences
  const healthReminders = document.getElementById("healthReminders");
  const dailyTips = document.getElementById("dailyTips");
  const goalNotifications = document.getElementById("goalNotifications");
  
  if (healthReminders) healthReminders.checked = prefs.healthReminders || false;
  if (dailyTips) dailyTips.checked = prefs.dailyTips || false;
  if (goalNotifications) goalNotifications.checked = prefs.goalNotifications || false;

  // Set health goals
  const dailySteps = document.getElementById("dailySteps");
  const sleepGoal = document.getElementById("sleepGoal");
  const waterGoal = document.getElementById("waterGoal");
  
  if (dailySteps) dailySteps.value = prefs.dailySteps || 10000;
  if (sleepGoal) sleepGoal.value = prefs.sleepGoal || 8;
  if (waterGoal) waterGoal.value = prefs.waterGoal || 8;

  // Set privacy preferences
  const dataSharing = document.getElementById("dataSharing");
  const dataRetention = document.getElementById("dataRetention");
  
  if (dataSharing) dataSharing.checked = prefs.dataSharing || false;
  if (dataRetention) dataRetention.value = prefs.dataRetention || "1year";

  // Theme color change handler
  themeColorSelect?.addEventListener("change", (e) => {
    applyThemeColor(e.target.value);
  });

  // Save button event
  const saveBtn = document.getElementById("saveBtn");
  saveBtn?.addEventListener("click", () => {
    const newPrefs = {
      displayName: displayNameInput?.value.trim() || "",
      darkMode: darkModeToggle?.checked || false,
      themeColor: themeColorSelect?.value || "default",
      healthReminders: healthReminders?.checked || false,
      dailyTips: dailyTips?.checked || false,
      goalNotifications: goalNotifications?.checked || false,
      dailySteps: parseInt(dailySteps?.value) || 10000,
      sleepGoal: parseFloat(sleepGoal?.value) || 8,
      waterGoal: parseInt(waterGoal?.value) || 8,
      dataSharing: dataSharing?.checked || false,
      dataRetention: dataRetention?.value || "1year"
    };

    localStorage.setItem(`prefs_${loggedInUser}`, JSON.stringify(newPrefs));

    if (newPrefs.darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    applyThemeColor(newPrefs.themeColor);

    // Show success message with animation
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '✅ Saved!';
    saveBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
    
    setTimeout(() => {
      saveBtn.innerHTML = originalText;
      saveBtn.style.background = '';
    }, 2000);
  });

  // Reset button event
  const resetBtn = document.getElementById("resetBtn");
  resetBtn?.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset all settings to defaults?")) {
      localStorage.removeItem(`prefs_${loggedInUser}`);
      location.reload();
    }
  });

  // Export data button
  const exportBtn = document.getElementById("exportDataBtn");
  exportBtn?.addEventListener("click", () => {
    const userData = {
      email: loggedInUser,
      preferences: prefs,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `health-data-${loggedInUser}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  });

  // Delete data button
  const deleteBtn = document.getElementById("deleteDataBtn");
  deleteBtn?.addEventListener("click", () => {
    if (confirm("⚠️ Are you sure you want to delete ALL your data? This action cannot be undone!")) {
      if (confirm("This will permanently delete your account and all associated data. Type 'DELETE' to confirm.")) {
        // Remove all user data
        localStorage.removeItem(`prefs_${loggedInUser}`);
        const users = JSON.parse(localStorage.getItem("users") || "{}");
        delete users[loggedInUser];
        localStorage.setItem("users", JSON.stringify(users));
        
        // Log out user
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loggedInUser');
        
        alert("Your data has been deleted. You will be redirected to the home page.");
        window.location.href = "index.html";
      }
    }
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
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser');
    window.location.href = "index.html";
  });
});
// Check
