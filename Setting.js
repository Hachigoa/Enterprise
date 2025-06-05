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

  // Logout button
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });
});
// Check
