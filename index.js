function getTime(timestamp) {
  let time = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[time.getDay()];
  function displayMinutes() {
    let minutsPlusZero = time.getMinutes();
    if (minutsPlusZero < 10) {
      return `0` + minutsPlusZero;
    } else {
      return minutsPlusZero;
    }
  }
  let minutes = displayMinutes();
  function displayHours() {
    let HoursPlusZero = time.getHours();
    if (HoursPlusZero < 10) {
      return `0` + HoursPlusZero;
    } else {
      return HoursPlusZero;
    }
  }
  let hours = displayHours();
  document.querySelector("#day-hour").innerHTML = `${day} ${hours}:${minutes}`;
}
function showTheDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}
function displayDailyForecast(response) {
  let dailyForecastElement = document.querySelector("#daily-forecast");
  let dailyForecastHtml = `<div class="row">`;
  let dailyForecastObjects = response.data.daily;
  dailyForecastObjects.forEach(function (dayObject, index) {
    if (index < 6) {
      dailyForecastHtml =
        dailyForecastHtml +
        `<div class="col-2">
              <div class="day" >${showTheDay(dayObject.dt)}</div>
            <img class="temp-icon" src=" http://openweathermap.org/img/wn/${
              dayObject.weather[0].icon
            }@2x.png" alt="Daily forecast image description">
              <div class="temperature-max-min">
                <span class="temp-max">${Math.round(dayObject.temp.max)}°</span>
                <span class="temp-min">${Math.round(dayObject.temp.min)}°</span>
              </div></div>`;
    }
  });
  dailyForecastHtml = dailyForecastHtml + `</div>`;
  dailyForecastElement.innerHTML = dailyForecastHtml;
}
function getCoordinates(Coordinates) {
  let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${Coordinates.lat}&lon=${Coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayDailyForecast);
}
function showCityTemp(response) {
  let iconResponse = response.data.weather[0].icon;
  let background = document.querySelector("#container");
  if (iconResponse.includes("n")) {
    background.classList.add("a");
    background.classList.remove("b");
  } else if (iconResponse.includes("d")) {
    background.classList.add("b");
    background.classList.remove("a");
  }
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#number-degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  getTime(response.data.dt * 1000);
  celsius = response.data.main.temp;
  getCoordinates(response.data.coord);
}

function activateTheCity(city) {
  let apiKey = "33fd04d85cdb641fd1bc55ca0162ba48";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showCityTemp);
}
function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  activateTheCity(city);
}
function activateCurrentButton(event) {
  event.preventDefault();
  function getPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "33fd04d85cdb641fd1bc55ca0162ba48";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=metric`;
    axios.get(apiUrl).then(showCityTemp);
  }
  navigator.geolocation.getCurrentPosition(getPosition);
}

let CurrentButtunTemp = document.querySelector("#current-button");
CurrentButtunTemp.addEventListener("click", activateCurrentButton);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", changeCity);
let celsius = null;

activateTheCity("tel aviv");
