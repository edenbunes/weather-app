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
function showCityTemp(response) {
  console.log(response.data.weather[0].icon);
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
function displayDegreesFahrenheit() {
  document.querySelector("#number-degrees").innerHTML = Math.round(
    celsius * (9 / 5) + 32
  );
  degreesFahrenheit.classList.add("active");
  degreesCelsius.classList.remove("active");
}
function displayDegreesCelsius() {
  document.querySelector("#number-degrees").innerHTML = Math.round(celsius);
  degreesFahrenheit.classList.remove("active");
  degreesCelsius.classList.add("active");
}

function displayDailyForecast() {
  let dailyForecastElement = document.querySelector("#daily-forecast");
  let dailyForecastHtml = `<div class="row">`;
  let days = ["sun", "mon", "tue", "wed", "thu"];
  days.forEach(function (day) {
    dailyForecastHtml =
      dailyForecastHtml +
      `<div class="col-2">
              <div class="day">${day}</div>
              <i class="fa-solid fa-sun"></i>
              <div class="temperature-max-min">
                <span class="temp-max">30°</span
                ><span class="temp-min">24°</span>
              </div></div>`;
  });
  dailyForecastHtml = dailyForecastHtml + `</div>`;
  dailyForecastElement.innerHTML = dailyForecastHtml;
}

let CurrentButtunTemp = document.querySelector("#current-button");
CurrentButtunTemp.addEventListener("click", activateCurrentButton);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", changeCity);
let celsius = null;
let degreesFahrenheit = document.querySelector("#degrees-fahrenheit");
degreesFahrenheit.addEventListener("click", displayDegreesFahrenheit);
let degreesCelsius = document.querySelector("#degrees-celsius");
degreesCelsius.addEventListener("click", displayDegreesCelsius);
displayDailyForecast();
activateTheCity("tel aviv");
