// Function to check if user is logged in
function isLoggedIn() {
  const accessToken = localStorage.getItem("accessToken");
  return !!accessToken;
}

// Function to update navigation bar
function updateNavbar() {
  const navbar = document.querySelector(".navbar-nav");

  navbar.innerHTML = "";

  if (isLoggedIn()) {
    const profileLink = document.createElement("a");
    profileLink.href = "/profile.html";
    profileLink.textContent = "Profile";
    navbar.appendChild(profileLink);

    // Display logout button
    const logoutButton = document.createElement("a");
    logoutButton.href = "#";
    logoutButton.textContent = "Log Out";
    logoutButton.addEventListener("click", handleLogout);
    navbar.appendChild(logoutButton);
  } else {
    // Display login and signup buttons
    const loginLink = document.createElement("a");
    loginLink.href = "/login.html";
    loginLink.textContent = "Log In";
    navbar.appendChild(loginLink);

    const signupLink = document.createElement("a");
    signupLink.href = "/signup.html";
    signupLink.textContent = "Sign Up";
    navbar.appendChild(signupLink);
  }
}

// Function to handle logout
function handleLogout() {
  localStorage.removeItem("accessToken");
  updateNavbar();
  window.location.href = "/index.html";
}

updateNavbar();
