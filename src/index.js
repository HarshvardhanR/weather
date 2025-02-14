import "../assets/styles.css";

// function locationExtractor(location){
//     const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=YN82XYUHJFGMYWP4THYN3DUC4`
//     return fetch(url, {mode: 'cors'})
//     .then((response) =>{
//         return response.json();
//     })
//     .catch((error)=> console.log(`Error: ${error}`))
// }

// locationExtractor("london").then((response)=>{
//     console.log(response) ;
// });

window.addEventListener("DOMContentLoaded", () =>{
    locationExtractor("london").then((response)=>{

        document.querySelector('.tempDiv').textContent = fahrenheitToCelsius(response.currentConditions.temp) + "°C"; 
        document.querySelector('.cityDiv').textContent = "London"

        const para1 = document.querySelector('.humidityPercentage');
        para1.textContent = response.currentConditions.humidity + "%";
        const para2 = document.querySelector('.windSpeed');
        para2.textContent = response.currentConditions.windspeed + " km/hr";
    });
})

function toTitleCase(str) {
    return str.toLowerCase()
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
}

function fahrenheitToCelsius(fahrenheit) {
    return Math.round(((fahrenheit - 32) * 5) / 9);
}

async function locationExtractor(location){
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=YN82XYUHJFGMYWP4THYN3DUC4`
    const response = await fetch(url, {mode:'cors'});
    return response.json();
}

document.querySelector('.searchBtn').addEventListener("click", ()=>{
    const input = document.querySelector('.searchBar').value;
    locationExtractor(input).then((response)=>{

        document.querySelector('.tempDiv').textContent = fahrenheitToCelsius(response.currentConditions.temp) + "°C"; 
        document.querySelector('.cityDiv').textContent = toTitleCase(input);

        const para1 = document.querySelector('.humidityPercentage');
        para1.textContent = response.currentConditions.humidity + "%";
    
        const para2 = document.querySelector('.windSpeed');
        para2.textContent = response.currentConditions.windspeed + " km/hr";
    });
})
