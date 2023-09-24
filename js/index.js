import { apiBaseUrl } from "./apiURL.js";

function fetchListings() {
  fetch(`${apiBaseUrl}/auction/listings`)
    .then((response) => response.json())
    .then((listings) => {
      listings.sort((a, b) => new Date(b.created) - new Date(a.created));

      displayListings(listings);
    })
    .catch((error) => {
      console.error("Error fetching listings:", error);
    });
}

// function to display listings on the page
function displayListings(listings) {
  const listingsContainer = document.getElementById("listings-container");

  listings.forEach((listing) => {
    const listingElement = document.createElement("div");
    listingElement.classList.add("listing-card");

    listingElement.innerHTML = `
    <h2>${listing.title}</h2>
        <h6>${listing.description}</h6>
        <img class="listing-image mb-3" src="${
          listing.media[0]
        }" alt="Listing Image">
        <p><strong>The auction ends at:</strong> ${new Date(
          listing.endsAt
        ).toLocaleDateString()}</p>
        <p><strong>Current bids:</strong> ${listing._count.bids}</p>
      `;

    const accessToken = localStorage.getItem("accessToken");
    const isAuthenticated = !!accessToken;

    if (isAuthenticated) {
      const bidForm = document.createElement("form");
      bidForm.classList.add("bid-form");

      bidForm.innerHTML = `
        <div class="form-group">
          
          <input
            type="number"
            class="form-control bid-input"
            id="bid-amount-${listing.id}"
            placeholder="Enter bid amount"
            required
            min="0"
          />
        </div>
        <button type="button" class="btn btn-primary mt-3" data-listing-id="${listing.id}">Place Bid</button>
      `;

      const bidButton = bidForm.querySelector("button");
      bidButton.addEventListener("click", placeBid);

      listingElement.appendChild(bidForm);
    }

    listingsContainer.appendChild(listingElement);
  });
}

function placeBid(event) {
  event.preventDefault();

  const accessToken = localStorage.getItem("accessToken");
  const isAuthenticated = !!accessToken;

  const listingId = event.target.getAttribute("data-listing-id");

  const bidAmount = parseFloat(
    document.getElementById(`bid-amount-${listingId}`).value
  );

  if (isNaN(bidAmount) || bidAmount < 0) {
    alert("Invalid bid amount. bid must be higher than 0.");
    return;
  }

  const bidData = {
    amount: bidAmount,
  };

  fetch(`${apiBaseUrl}/auction/listings/${listingId}/bids`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify(bidData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to place bid, try a higher bid");
      }
      return response.json();
    })
    .then((data) => {
      alert("Bid placed successfully!");
    })
    .catch((error) => {
      alert("Error placing bid:" + error.message);
    });
}

//  function to search listings based on user input
function searchListings() {
  const searchInput = document.getElementById("search-input");
  const searchQuery = searchInput.value.toLowerCase();
  const listingsContainer = document.getElementById("listings-container");
  const listingCards = listingsContainer.querySelectorAll(".listing-card");

  listingCards.forEach((listingCard) => {
    const titleElement = listingCard.querySelector("h2");
    const descriptionElement = listingCard.querySelector("h5");

    const title = titleElement.textContent.toLowerCase();
    const description = descriptionElement.textContent.toLowerCase();

    if (title.includes(searchQuery) || description.includes(searchQuery)) {
      listingCard.style.display = "block";
    } else {
      listingCard.style.display = "none";
    }
  });
}

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", searchListings);

window.addEventListener("load", fetchListings);
