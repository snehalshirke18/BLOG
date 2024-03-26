// Replace with your actual Twitter API credentials
const bearerToken =
    "AAAAAAAAAAAAAAAAAAAAAPd%2FrwEAAAAAs7rgW4GiTbVwLgifTQE8abf8CCE%3DdBJvhWDAZqmOf9vRQmYVXyMiQKgGd4tDC1Zl5lwBv7U9nE5HzV";

async function getAIRelatedTrends() {
    try {
        const response = await fetch(
            `https://api.twitter.com/2/trends/place?id=1`,
            {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                },
            }
        );

        const data = await response.json();

        // Filter trends for AI-related keywords
        const aiRelatedTrends = data.trends.filter((trend) => {
            const trendName = trend.name.toLowerCase();
            const aiKeywords = [
                "ai",
                "machine learning",
                "deep learning",
                "artificial intelligence",
            ];
            return aiKeywords.some((keyword) => trendName.includes(keyword));
        });

        // Get the container element
        const trendContainer = document.getElementById("trendContainer");

        // Counter for tags
        let counter = 1;

        // Iterate through AI-related trends and create HTML elements
        aiRelatedTrends.forEach((trend) => {
            const trendItem = document.createElement("a");
            trendItem.href = `https://twitter.com/search?q=${trend.name}`;
            trendItem.classList.add("item", "hover-main");

            const counterElement = document.createElement("h2");
            counterElement.id = "counter";
            counterElement.innerText = counter++;

            const content = document.createElement("div");
            content.classList.add("content");

            const title = document.createElement("h6");
            title.classList.add("title");
            title.innerText = trend.name;

            // Append elements to the container
            content.appendChild(counterElement);
            content.appendChild(title);
            trendItem.appendChild(content);
            trendContainer.appendChild(trendItem);
        });
    } catch (error) {
        console.error("Error fetching trends:", error);
    }
}

// Call the function to display AI-related trends
getAIRelatedTrends();
