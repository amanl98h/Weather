const API = 'http://api.openweathermap.org/data/2.5/weather?q='
const apiKey = '&appid=f289edf1b0db3bbf2d5977b3b5390ed0'
const form = document.querySelector('.search__name')
const output = document.querySelector('.output')
const text__content = document.getElementById('text__content')

const getWeather = async () => {
    const input = document.getElementById('inp')
    const url = API + input.value + apiKey
    const request = await fetch(url)
    const response = await request.json()
    console.log(response);
    input.value = ''
    renderWeather(response)
    getMap(response.coord)
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    getWeather()

})

const renderWeather = (data) => {
    output.innerHTML = ''
    text__content.innerHTML = ''
    const name = document.createElement('h1')
    name.textContent = 'City: ' + data.name
    const wind = document.createElement('p')
    wind.textContent = 'Wind: speed: ' + data.wind.speed + ' ' + 'gust: ' + data.wind.gust + ' ' + 'deg: ' + data.wind.deg
    const tempС = document.createElement('h2')
    tempС.textContent = `Temp: ${Math.floor(data.main.temp - 273.15)} C`
    const tempF = document.createElement('h2')
    tempF.textContent = `Temp: ${Math.floor(((data.main.temp - 273.15) * 1.8) + 32)} F`
    const weather = document.createElement('h2')
    weather.textContent = 'Weather: ' + data.weather[0].main
    const coord = document.createElement('h3')
    coord.textContent = 'Coord: ' + 'Lat: ' + data.coord.lat + ' ' + 'Lon: ' + data.coord.lon
    const country = document.createElement('h3')
    country.textContent = 'Country: ' + data.sys.country



    text__content.append(name, tempС, tempF, weather, coord, country, wind)
    output.append(text__content)
}


const getMap = (coord) => {
    let map = document.createElement('div')
    map.id = 'map'
    DG.then(function () {
        map = DG.map('map', {
            center: [coord.lat, coord.lon],
            zoom: 13
        });

        DG.marker([coord.lat, coord.lon]).addTo(map).bindPopup('Вы кликнули по мне!');
    });
    output.prepend(map)
}




