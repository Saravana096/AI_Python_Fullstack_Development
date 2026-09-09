const cityInput =
    document.getElementById("cityInput");

const searchButton =
    document.getElementById("searchButton");

const message =
    document.getElementById("message");

const cityName =
    document.getElementById("cityName");

const temperature =
    document.getElementById("temperature");

const windSpeed =
    document.getElementById("windSpeed");


// Search weather
searchButton.addEventListener(
    "click",
    getWeather
);


// Enter key
cityInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            getWeather();

        }

    }
);


// Weather function
async function getWeather() {

    const city =
        cityInput.value.trim();


    if (city === "") {

        message.textContent =
            "Please enter a city name.";

        return;

    }


    message.textContent =
        "Loading weather...";


    try {

        // Get city coordinates
        const geoResponse =
            await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
            );


        if (!geoResponse.ok) {

            throw new Error(
                "Unable to fetch city data."
            );

        }


        const geoData =
            await geoResponse.json();


        if (
            !geoData.results ||
            geoData.results.length === 0
        ) {

            throw new Error(
                "City not found."
            );

        }


        const latitude =
            geoData.results[0].latitude;

        const longitude =
            geoData.results[0].longitude;

        const foundCity =
            geoData.results[0].name;


        // Get weather data
        const weatherResponse =
            await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`
            );


        if (!weatherResponse.ok) {

            throw new Error(
                "Unable to fetch weather data."
            );

        }


        const weatherData =
            await weatherResponse.json();


        // Display data
        cityName.textContent =
            foundCity;

        temperature.textContent =
            weatherData.current.temperature_2m;

        windSpeed.textContent =
            weatherData.current.wind_speed_10m;


        message.textContent =
            "Weather data loaded successfully.";

    }

    catch (error) {

        message.textContent =
            error.message;

        cityName.textContent =
            "No weather data";

        temperature.textContent =
            "--";

        windSpeed.textContent =
            "--";

    }

}