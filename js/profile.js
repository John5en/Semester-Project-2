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

// Function to fetch and display the users profile using access token
function loadUserProfile() {
  const accessToken = localStorage.getItem("accessToken");
  const name = localStorage.getItem("name");

  if (!accessToken || !name) {
    console.error("Access token or name is missing.");
    return;
  }

  fetch(`${apiBaseUrl}/auction/profiles/${name}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch user profile data");
      }
      return response.json();
    })
    .then((userData) => {
      console.log("User profile data:", userData);
      displayProfileData(userData);
    })
    .catch((error) => {
      console.error("Error fetching user profile data:", error);
    });
}

function displayProfileData(userData) {
  const nameElement = document.getElementById("profile-name");
  const emailElement = document.getElementById("profile-email");
  const avatarElement = document.getElementById("profile-avatar");
  const creditsElement = document.getElementById("profile-credits");
  const winsElement = document.getElementById("profile-wins");
  const listingsElement = document.getElementById("profile-listings");

  nameElement.textContent = userData.name;
  emailElement.textContent = userData.email;
  creditsElement.textContent = userData.credits;
  winsElement.textContent = userData.wins.length;
  listingsElement.textContent = userData._count.listings;

  if (userData.avatar) {
    avatarElement.src = userData.avatar;
  } else {
    avatarElement.src = "/images/Group 1 transparent.jpg";
  }
}

loadUserProfile();
