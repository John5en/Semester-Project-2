import { apiBaseUrl } from "./apiURL.js";

// Function to display error message
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

// event listener to form submission
document
  .getElementById("registration-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const avatar = document.getElementById("avatar").value;

    hideErrorMessage();

    const namePattern = /^[a-zA-Z0-9_]+$/;
    if (!namePattern.test(name)) {
      displayErrorMessage(
        "Invalid name. Use only letters, digits, and underscores."
      );
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@(stud\.)?noroff\.no$/;
    if (!emailPattern.test(email)) {
      displayErrorMessage(
        "Invalid email. Use a valid stud.noroff.no or noroff.no email address."
      );
      return;
    }

    if (password.length < 8) {
      displayErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    const requestBody = {
      name,
      email,
      password,
      avatar,
    };

    fetch(`${apiBaseUrl}/auction/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.id) {
          window.location.href = "/login.html";
        } else {
          console.error("Registration failed:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  });
