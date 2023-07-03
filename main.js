let getData = async (user_input) => {
    if (isNaN(user_input)) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${user_input}&appid=f0ed59b01039ab16f2db6f9f74d66fa1`)
        const data = await response.json()
        return data
    } else {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${user_input}&appid=f0ed59b01039ab16f2db6f9f74d66fa1`)
        const data = await response.json()
        return data
    }  
}

let loadData = async () => {
    event.preventDefault();
    let cityInfo = document.getElementById('input').value
    let data = await getData(cityInfo);

    let newHeader = `<div class="card-header">${data.name}, ${data.sys.country}</div>`;

    let newList = `<br><li class="list-group-item"><strong>High: </strong>${((data.main.temp_max - 273.15) * 9/5 + 32).toFixed(0)}°F</li><br>
    <li class="list-group-item"><strong>Low: </strong>${((data.main.temp_min - 273.15) * 9/5 + 32).toFixed(0)}°F</li><br>
    <li class="list-group-item"><strong>Forecast: </strong>${data.weather[0]['main']}</li><br>
    <li class="list-group-item"><strong>Humidity: </strong>${data.main.humidity}%</li><br>`;

    document.getElementById('cityContainer').innerHTML = newHeader + newList;
}

let updateBackground = async () => {
    let cityInfo = document.getElementById('input').value
    let data = await getData(cityInfo);

    let checkWeather = data.weather[0]['main']

    if (checkWeather === 'Rain' || checkWeather === 'Drizzle') {
        document.body.style.backgroundImage = `url('/images/rainy.jpg')`;
    } else if (checkWeather === 'Clouds'){
        document.body.style.backgroundImage = `url('/images/cloudy.jpg')`;
    } else if (checkWeather === 'Clear') {
        document.body.style.backgroundImage = `url('/images/clear.jpg')`;
    } else if (checkWeather === 'Thunderstorm') {
        document.body.style.backgroundImage = `url('/images/lightning.jpg')`;
    } else if (checkWeather === 'Snow') {
        document.body.style.backgroundImage = `url('/images/snow.jpg')`;
    } else {
        document.body.style.backgroundImage = `url('/images/atmosphere.jpg')`;
    }
}