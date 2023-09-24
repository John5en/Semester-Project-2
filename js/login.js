import { apiBaseUrl } from "./apiURL.js";

// function to display error message
function displayErrorMessage(message) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

// Function to hide error message
function hideErrorMessage() {
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = "";
  errorMessage.style.display = "none";
}

// event listener to the form submission
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  hideErrorMessage();

  const requestBody = {
    email,
    password,
  };

  fetch(`${apiBaseUrl}/auction/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("name", data.name);

        window.location.href = "/profile.html";
      } else {
        console.error("Login failed:", data.error);
        displayErrorMessage("Login failed. Please check your credentials.");
      }
    })
    .catch((error) => {
      console.error("Error during login:", error);
      displayErrorMessage("An error occurred during login. Please try again.");
    });
});
