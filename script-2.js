document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();  // prevent page reload

    const email = this.email.value.trim();
    const password = this.password.value;
    const confirmPassword = this.confirm_password.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Save user credentials in localStorage (for demo only, NOT secure for real apps)
    const users = JSON.parse(localStorage.getItem('users') || '{}');

    if (users[email]) {
      alert("This email is already registered. Please log in.");
      return;
    }

    users[email] = { password: password };
    localStorage.setItem('users', JSON.stringify(users));

    // Set login state
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loggedInUser', email);

    alert("Signup successful! Redirecting to homepage...");

    // Redirect to homepage or dashboard (change the URL as needed)
    window.location.href = "index.html"; 
  });
