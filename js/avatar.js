import { apiBaseUrl } from "./apiURL.js";

// Function to update the users avatar
function updateAvatar() {
  const avatarUrlInput = document.getElementById("avatar-url-input");
  const newAvatarUrl = avatarUrlInput.value;
  const avatarErrorMessage = document.getElementById("avatar-error-message");

  const accessToken = localStorage.getItem("accessToken");
  const name = localStorage.getItem("name");

  if (newAvatarUrl && accessToken && name) {
    fetch(`${apiBaseUrl}/auction/profiles/${name}/media`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: newAvatarUrl,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update avatar");
        }
        return response.json();
      })
      .then((data) => {
        const avatarElement = document.getElementById("profile-avatar");
        avatarElement.src = newAvatarUrl;

        avatarUrlInput.value = "";

        avatarErrorMessage.textContent = "";
      })
      .catch((error) => {
        console.error("Error updating avatar:", error);

        avatarErrorMessage.textContent =
          "Failed to update avatar. Please check the URL.";
      });
  } else {
    avatarErrorMessage.textContent = "Please enter a valid image URL.";
  }
}

const updateAvatarButton = document.getElementById("update-avatar-btn");

updateAvatarButton.addEventListener("click", updateAvatar);
