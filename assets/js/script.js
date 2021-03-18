// Assignment code
let searchForm = $("#searchForm");
let searchHitstoyEl = $("#searchHistory")
const baseUrl = "https://api.openweathermap.org/data/2.5/";
const apiKey = "affc76011fc8733569fa53103a2a2374";
const currentWeatherEl = $("#currentWeather");
const fiveDayForecastEl = $("#fiveDayForecast")


// Weather Icons
const sunny = $("<i class='fas fa-sun'>");
// const cloudy
// const 

$(document).ready(function () {

    searchForm.submit(function (event) {
        event.preventDefault();
        let userSearchValues = $(this).serializeArray();
        // console.log(userSearchValues);
        let city = userSearchValues[0].value;
        let pastSearchDiv = $("<div>");
        pastSearchDiv.text(city);
        searchHitstoyEl.append(pastSearchDiv);
        searchCurrentWeather(city);
        generateFiveDayForecast(city);
    });

    function searchCurrentWeather(city) {
        const currentRequestUrl = baseUrl + "weather?q=" + city + "&units=imperial&appid=" + apiKey;
        // const userRequestUrl = `${baseUrl}weather?q=${city}&appid=${apiKey}`;


        // Request data from API
        fetch(currentRequestUrl)
            .then(function (response) {
                // console.log(response);
                // console.log(response.status);
                if (response.status !== 200) {
                    console.log("error");
                }
                return response.json();
            })
            .then(function (data) {
                // console.log(data);
                let cityName = data.name;
                let currentDate = moment().format("MMMM Do, YYYY");
                // let currentIcon = data.weather[0].icon;
                let currentTemp = data.main.temp;
                let currentHumidity = data.main.humidity;
                let currentWindSpeed = data.wind.speed;
                // console.log(cityName, currentTemp, currentHumidity, currentWindSpeed);
                
                // Create current title
                let currentTitle = $("<h3>");
                currentTitle.text("Current Weather: ");
                currentWeatherEl.append(currentTitle);
                
                // Create current city/date/icon
                let currentElCityName = $("<div>");
                // let currentElIcon = $("<img alt='weather icon'>");
                // currentElIcon.attr("src", `http://openweathermap.org/img/wn/${currentIcon}@2x.png`);
                currentElCityName.text(cityName + " (" + currentDate + ") ");
                currentWeatherEl.append(currentElCityName);

                // Create current temp
                let currentElTemp = $("<div>");
                currentElTemp.text("Current Temperature: " + currentTemp + " °F");
                                    // `Current Temperature: ${currentTemp} °F`
                currentWeatherEl.append(currentElTemp);

                // Create current humidity
                let currentElHumidity = $("<div>");
                currentElHumidity.text("Humidity: " + currentHumidity + "%");
                currentWeatherEl.append(currentElHumidity);

                // Create current wind speed
                let currentElWind = $("<div>");
                currentElWind.text("Wind Speed: " + currentWindSpeed + " MPH");
                currentWeatherEl.append(currentElWind);

            });
    }

    function generateFiveDayForecast(city) {
        const fiveDayRequestUrl = `${baseUrl}forecast?q=${city}&units=imperial&appid=${apiKey}`;
        // const fiveDayRequestUrl = baseUrl + "forecast?q=" + city + "&units=imperial&appid=" + apiKey;

        // Request data from API
        fetch(fiveDayRequestUrl)
            .then(function (response) {
                if (response.status !== 200) {
                    console.log("error");
                }
                return response.json();
            })
            .then(function (data) {
                console.log(data);

            console.log(data.list);
            let midayArray = [];
                for (i = 0; i < data.list.length; i++) {
                    if (data.list[i].dt_txt.includes("15:00:00")) {
                        console.log(data.list[i]);
                        midayArray.push(data.list[i]);
                    }
                }
                console.log(midayArray);

                let forecastTitle = $("<h3>");
                forecastTitle.text("5-Day Forecast: ");
                fiveDayForecastEl.append(forecastTitle);

                for (i = 0; i < midayArray.length; i++) {
                    let forecastDate = moment(midayArray[i].dt_txt).format("l");
                    // let forecastIcon =
                    let forecastTemp = midayArray[i].main.temp;
                    let forecastHumidity =midayArray[i].main.humidity;
                    console.log(forecastDate, forecastTemp, forecastHumidity);

                    let eachDayDiv = $("<div class='col-2 border-3-primary'>");
                    
                    let eachDayDate = $("<div>");
                    eachDayDate.text(forecastDate);
                    eachDayDiv.append(eachDayDate);

                    let eachDayTemp = $("<div>");
                    eachDayTemp.text("Temp: " + forecastTemp);
                    eachDayDiv.append(eachDayTemp);

                    let eachDayHumidity = $("<div>");
                    eachDayHumidity.text("Humidity: " + forecastHumidity);
                    eachDayDiv.append(eachDayHumidity);

                    fiveDayForecastEl.append(eachDayDiv);



                }


            
            });
    }

    

});











// searchBtn.on("click", function() {
//     // if (userCityInput === "") {
//     //     window.alert("You must enter a city name to view a weather report!");
//     // }
//     let userCitySearch = userCityInput.val();
//     console.log(userCitySearch);

//     const userRequestUrl = baseUrl + "q=" + userCitySearch + "&appid=" + apiKey;
//     // const userRequestUrl = `${baseUrl}q=${userCitySearch}&appid=${apiKey}`;

//     fetch(userRequestUrl)
//     .then(function (response) {
//         console.log(response);
//         console.log(response.status);
//         if (response.status !== 200) {
//             console.log("error");
//         }
//     return response.json();
//     })
//     .then (function (data) {
//         console.log(data);
//     });
// });





