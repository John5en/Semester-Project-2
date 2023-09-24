import { apiBaseUrl } from "./apiURL.js";

const createListingEndpoint = `${apiBaseUrl}/auction/listings`;

// Function to handle listing creation
function createListing(event) {
  event.preventDefault();

  const accessToken = localStorage.getItem("accessToken");

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const media = document.getElementById("media").value;
  const endsAt = document.getElementById("endsAt").value;

  if (!title || !endsAt) {
    alert("Title and deadline date are required.");
    return;
  }

  if (!media) {
    alert("Image URL is required.");
    return;
  }

  const listingData = {
    title,
    description,
    media: [media],
    endsAt: new Date(endsAt).toISOString(),
  };

  fetch(createListingEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(listingData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to create listing");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Listing created:", data);

      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
      document.getElementById("media").value = "";
      document.getElementById("endsAt").value = "";
    })
    .catch((error) => {
      console.error("Error creating listing:", error);
    });
}

const listingForm = document.getElementById("listing-form");
listingForm.addEventListener("submit", createListing);
