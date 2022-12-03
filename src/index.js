function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let weekday = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${weekday} ${hours}:${minutes}`;
}

function displayConditions(response) {
  document.querySelector("#city").innerHTML = response.data.city;

  document.querySelector("#dateTime").innerHTML = formatDate(
    response.data.time * 1000
  );

  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  document
    .querySelector("#icon")
    .setAttribute("src", `${response.data.condition.icon_url}`);

  document
    .querySelector("#icon")
    .setAttribute("alt", `${response.data.condition.description}`);

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.temperature.feels_like
  );

  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;

  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );

  celsiusTemperature = response.data.temperature.current;
}

function citySearch(city) {
  let apiKey = "f65b33ot2ea727d4e0e7bcb38f9d0783";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  citySearch(cityInput.value);
}

function showFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheit = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheit);
}

function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

citySearch("Manchester");
