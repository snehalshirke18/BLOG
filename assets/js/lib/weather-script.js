// weather-script.js

document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "fbf712a5a83d7305c3cda4ca8fe7ef29"; // Replace with your OpenWeatherMap API key
    const city = "Pune"; // Replace with your desired city

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const temperature = data.main.temp;
            const description = data.weather[0].description;

            document.getElementById(
                "weather-details"
            ).textContent = `${temperature}°C, ${description}`;
            document.getElementById("city").textContent = city;
        })
        .catch((error) => console.error("Error fetching weather data:", error));
});
