// Function to fetch and display crypto currencies
function displayCryptoCurrencies(apiUrl, containerId) {
    // Fetch data from the API
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Get the container element
            const cryptoContainer = document.getElementById(containerId);

            // Iterate through the fetched data and create HTML elements for each crypto currency
            data.forEach((crypto) => {
                const cryptoItem = document.createElement("div");
                cryptoItem.classList.add("stock-card-item");

                // Create and set the image element
                const cryptoImage = document.createElement("img");
                cryptoImage.src = crypto.image;
                cryptoImage.alt = crypto.name + " Image";

                // Set the size of the image
                cryptoImage.style.width = "35px";
                cryptoImage.style.height = "35px";

                const content = document.createElement("div");
                content.classList.add("stock-card-content");

                // Create and set the title element
                const title = document.createElement("div");
                title.classList.add("title");

                const cryptoId = document.createElement("h6");
                cryptoId.innerHTML = crypto.id;

                const cryptoSymbol = document.createElement("span");
                cryptoSymbol.innerHTML = `<small>${crypto.symbol}</small>`;

                const price = document.createElement("span");
                price.classList.add("price");
                price.innerHTML = crypto.current_price + " USD";

                // Calculate percentage
                const high24h = crypto.high_24h;
                const percentage =
                    ((crypto.current_price - high24h) / high24h) * 100;

                // Create and set the percentage element
                const percentageElement = document.createElement("small");
                percentageElement.classList.add("indicator");

                if (percentage < 0) {
                    percentageElement.classList.add("text-danger");
                    percentageElement.innerHTML = `<i class="ion-arrow-down-b"></i> ${Math.abs(
                        percentage.toFixed(1)
                    )}%`;
                } else {
                    percentageElement.classList.add("text-success");
                    percentageElement.innerHTML = `<i class="ion-arrow-up-b"></i> ${percentage.toFixed(
                        1
                    )}%`;
                }

                // Append elements to the container
                title.appendChild(cryptoId);
                title.appendChild(cryptoSymbol);

                content.appendChild(title);
                content.appendChild(price);

                cryptoItem.appendChild(cryptoImage);
                cryptoItem.appendChild(content);
                cryptoItem.appendChild(percentageElement);

                // Add click event listener to redirect to CoinGecko page
                cryptoItem.addEventListener("click", () => {
                    window.location.href = `https://www.coingecko.com/en/coins/${crypto.id}`;
                });

                cryptoContainer.appendChild(cryptoItem);
            });
        })
        .catch((error) => console.error("Error fetching data:", error));
}

// Call the function with the API endpoint and container ID
const apiUrl =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=3&page=1&sparkline=false";
const containerId = "cryptoContainer";

// Display crypto currencies
displayCryptoCurrencies(apiUrl, containerId);
