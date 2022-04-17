
function searchFunc(event){
event.preventDefault();
  let citySearch = document.querySelector("#city_search");   
    let key = "573ad8fa32ebfbbc89fdc5d201e22d95";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&appid=${key}&units=metric`;

      axios.get(url).then(displayWeather);
      
}

function displayWeather(response){
   let cityName = document.querySelector("#city_name");
  cityName.innerHTML = response.data.name;
  let degree = document.querySelector("#degree");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let emojiSpan = document.querySelector("#emoji");
  let currentDegree = response.data.main.temp;
  degree.innerHTML = Math.round(currentDegree);
  wind.innerHTML = (response.data.wind.speed) +"km/h";
  humidity.innerHTML = (response.data.main.humidity) +"%";
   let description = document.querySelector("#description");
  let weatherDescription = response.data.weather[0].description;
  description.innerHTML = weatherDescription;
  let emoji = "🌞"
  if(currentDegree<0){
    emoji = "❄"
  }
  else if (currentDegree>0 && currentDegree<5){
   emoji = "🌧"
  }else if (currentDegree>0 && currentDegree<15){
   emoji = "⛅"
  }
  emojiSpan.innerHTML = emoji;
}

function showPosition(position) {
    let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
let location = document.querySelector("#location");
location.innerHTML = `latitude:${latitude}  _  longitude:${longitude}`;
    let key = "573ad8fa32ebfbbc89fdc5d201e22d95";
     let url = `https://api.openweathermap.org/data/2.5/weather?&appid=${key}&units=metric&lat=${latitude}&lon=${longitude}`;
      axios.get(url).then(displayWeather);
}
function currentPosition(){
  navigator.geolocation.getCurrentPosition(showPosition);
}

function changeDegreeToFar() {
  if (cel == true && far == false){
  far = true;
  cel = false;
  let degree = document.querySelector("#degree");
  let x = parseInt(document.querySelector("#degree").innerHTML);
  degree.innerHTML =Math.round( (x * 9/5) + 32);
  }
}
function changeDegreeToCel() {
  if(cel == false && far == true){
  cel = true;
  far = false;

  let degree = document.querySelector("#degree");
  let x = parseInt(document.querySelector("#degree").innerHTML);
  degree.innerHTML = Math.round((x - 32) * 5/9);
  }
}


let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit",searchFunc);

let now = new Date();
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let date = document.querySelector("#date");
let minute = now.getMinutes();
let houre =  now.getHours();
if(minute<10){
  minute = "0"+minute;
}
if(houre<10){
  houre = "0"+houre;
}
date.innerHTML = days[now.getDay()] +" "+ houre+":"+minute;

let button_location = document.querySelector("#button_location");
button_location.addEventListener("click",currentPosition);


let button_far = document.querySelector("#change_degree_f");
button_far.addEventListener("click",changeDegreeToFar);
let button_cel = document.querySelector("#change_degree_c");
button_cel.addEventListener("click",changeDegreeToCel);
let far = false;
let cel = true;