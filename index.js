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
  console.log(response.data);
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
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", changeCity);
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
activateTheCity("tel aviv");
