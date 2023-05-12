// onload infomation
const domManip = (() => {
    const searchBth = document.querySelector('.button')
    const clearBtn = document.querySelector('.clear-btn')
    searchBth.addEventListener('click', getWeather)
    clearBtn.addEventListener('click', clearSearch)
})()
    
// fetching weather infomation 
async function getWeather() {
    try {
        const searchInput = document.querySelector('.input').value
        console.log(searchInput)
        
        // input validation
        if(searchInput === "") {
            alert('Please Enter a City')
        }
        
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + ',' + "&units=imperial&APPID=094258fc2517ffa808d3636c4035a570", {mode: 'cors'})
        const currentData = await response.json()

        // weather object information
        const currentWeather = {
            mainWeather: currentData.weather[0].main,
            place: currentData.name,
            temp: Math.round(currentData.main.temp),
            humidity: currentData.main.humidity + "%",
            wind: Math.round(currentData.wind.speed) + "MPH"
        }
        console.log(currentWeather)

        displayWeather(currentWeather)
    }catch(err) {
        console.log("Something has went wrong with fetching the current weather data....", err)
        alert("Something has went wrong with fetching the current weather data....", err)
    }
}

// clearing the previous infomation 
function clearSearch() {
    document.querySelector('.input').value = ""
    clearDom()
}

// displaying the infomation 
function displayWeather(currentWeather) {
    const displayDiv = document.querySelector('.display-div')
    displayDiv.style = 'flex'

    const city = document.createElement("p")
    city.textContent = currentWeather.place
    displayDiv.appendChild(city)

    const status = document.createElement("p");
    status.textContent = currentWeather.mainWeather;
    displayDiv.appendChild(status);

    const cityTemp = document.createElement("p");
    cityTemp.textContent = currentWeather.temp + " Degrees";
    displayDiv.appendChild(cityTemp);

    const cityHumidity = document.createElement("p");
    cityHumidity.textContent = currentWeather.humidity + " Humidity";
    displayDiv.appendChild(cityHumidity);

    const cityWind = document.createElement("p");
    cityWind.textContent = currentWeather.wind + " Wind";
    displayDiv.appendChild(cityWind);
}

// clearing the previous displayed information 
function clearDom() {
    const nodeList = document.querySelectorAll("p")
    if(nodeList !== null) {
        for (let index = 0; index < nodeList.length; index++) {
            nodeList[index].remove()
        }
    }
}




