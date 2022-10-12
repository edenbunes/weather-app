let time = new Date();

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
function getZero() {
  let minutsPlusZero = time.getMinutes();
  if (minutsPlusZero < 10) {
    return `0` + minutsPlusZero;
  } else {
    return minutsPlusZero;
  }
}
let minutes = getZero();
function getZeroForHours() {
  let HoursPlusZero = time.getHours();
  if (HoursPlusZero < 10) {
    return `0` + HoursPlusZero;
  } else {
    return HoursPlusZero;
  }
}
let hours = getZeroForHours();
let dayAndHour = document.querySelector("#day-hour");
dayAndHour.innerHTML = `${day} ${hours}:${minutes}`;

function showCityTemp(response) {
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
