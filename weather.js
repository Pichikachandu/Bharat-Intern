var inputvalue = document.querySelector("#cityinput");
var btn = document.querySelector("#submitBtn");
var city = document.querySelector("#cityoutput");
var descrip = document.querySelector("#description");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var apiKey = "11a51281a07bddf6d8a00c2c763a74d4";

function convertion(val) {
    return (val - 273).toFixed(3);
}

btn.addEventListener("click", function () {
    var cityName = inputvalue.value;
    var apiUrl;

    if (cityName.toLowerCase() === "all") {
        // If the user enters "all", fetch weather for all cities in India
        apiUrl = `https://api.openweathermap.org/data/2.5/group?id=1269750,1273294,1262321,1275004,1264527,1274746,1269515,1276736,1275339,1275339&appid=${apiKey}`;
    } else {
        // Fetch weather for the specified city
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    }

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (cityName.toLowerCase() === "all") {
                // Handle data for multiple cities
                displayWeatherForAllCities(data);
            } else {
                // Handle data for a single city
                displayWeatherForSingleCity(data);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            city.textContent = 'Failed to fetch weather data. Please try again.';
            descrip.textContent = '';
            temp.textContent = '';
            wind.textContent = '';
        });
});

function displayWeatherForSingleCity(data) {
    city.textContent = `City: ${data.name}`;
    descrip.textContent = `Description: ${data.weather[0].description}`;
    temp.textContent = `Temperature: ${convertion(data.main.temp)}°C`;
    wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

function displayWeatherForAllCities(data) {
    // Clear previous data
    city.textContent = '';
    descrip.textContent = '';
    temp.textContent = '';
    wind.textContent = '';

    // Loop through the list of cities and display weather information
    data.list.forEach(cityData => {
        const cityElement = document.createElement('div');
        cityElement.textContent = `City: ${cityData.name}, Description: ${cityData.weather[0].description}, Temperature: ${convertion(cityData.main.temp)}°C, Wind Speed: ${cityData.wind.speed} m/s`;
        document.body.appendChild(cityElement);
    });
}
