$(document).ready(function () {
    // Assignment code
    let searchForm = $("#searchForm");
    let searchHitstoyEl = $("#searchHistory")
    const baseUrl = "https://api.openweathermap.org/data/2.5/";
    const apiKey = "affc76011fc8733569fa53103a2a2374";
    const currentWeatherEl = $("#currentWeather");
    const fiveDayForecastEl = $("#fiveDayForecast")
    let searchHistory = [];

    function createCurrentWeatherIcon(data) {
        console.log(data);
        let currentIcon = data.weather[0].icon;
        if (currentIcon === "01n") {
            const nightClearIcon = $("<i class='fas fa-moon fa-5x'>");
            currentWeatherEl.append(nightClearIcon); // .css("display", 'inline')
        }
        else if (currentIcon === "01d") {
            const clearIcon = $("<i class='fas fa-sun fa-5x'>");
            currentWeatherEl.append(clearIcon); 
        }
        else if (currentIcon === "02d") {
            const cloudySunIcon = $("<i class='fas fa-cloud-sun fa-5x'>");
            currentWeatherEl.append(cloudySunIcon); 
        }
        else if (currentIcon === "02n") {
            const cloudyNightIcon = $("<i class='fas fa-cloud-moon fa-5x'>");
            currentWeatherEl.append(cloudyNightIcon); 
        }
        else if (currentIcon === "03d" || "03n" || "04d" || "04n") {
            const cloudyIcon = $("<i class='fas fa-cloud fa-5x'>");
            currentWeatherEl.append(cloudyIcon); 
        }
        else if (currentIcon === "10d") {
            const rainSunIcon = $("<i class='fas fa-cloud-sun-rain fa-5x'>");
            currentWeatherEl.append(rainSunIcon); 
        }
        else if (currentIcon === "10n") {
            const rainNightIcon = $("<i class='fas fa-cloud-moon-rain fa-5x'>");
            currentWeatherEl.append(rainNightIcon); 
        }
        else if (currentIcon === "13d" || "13n") {
            const snowIcon = $("<i class='far fa-snowflake fa-5x'>");
            currentWeatherEl.append(snowIcon); 
        }
        else if (currentIcon === "09d" || "09n") {
            const rainIcon = $("<i class='fas fa-cloud-showers-heavy fa-5x'>");
            currentWeatherEl.append(rainIcon); 
        }
        else if (currentIcon === "11d" || "11n") {
            const lightningIcon = $("<i class='fas fa-bolt fa-5x'>");
            currentWeatherEl.append(lightningIcon); 
        }
        else if (currentIcon === "50d" || "50n") {
            const crazyIcon = $("<i class='fas fa-radiation-alt fa-5x'>");
            currentWeatherEl.append(crazyIcon); 
        }
    }
  
    // Search button function upon form submission
    searchForm.submit(function (event) {
        event.preventDefault();
        currentWeatherEl.empty();
        fiveDayForecastEl.empty();
        let userSearchValues = $(this).serializeArray();
        // console.log(userSearchValues);
        let city = userSearchValues[0].value;
        searchHistory.push(city);
        console.log(searchHistory);
        let pastSearchButton = $("<button type='button' class='btn mb-1 col-10 past-search'>");
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        pastSearchButton.text(city);
        searchHitstoyEl.prepend(pastSearchButton);
        console.log(searchHistory.length);
        // if (searchHistory.length === 1) {
        //     createClearButton();
        // }
        // $(".clear-search").click(function(event) {
        //     event.preventDefault()
        //     searchHitstoyEl.empty();
        //     localStorage.clear();
        // });
        // createClearButton();
        generateCurrentWeather(city);
        generateFiveDayForecast(city);
    });

    // Function to create current weather element
    function generateCurrentWeather(city) {
        const currentRequestUrl = baseUrl + "weather?q=" + city + "&units=imperial&appid=" + apiKey;
        // const userRequestUrl = `${baseUrl}weather?q=${city}&appid=${apiKey}`;

        // Request data from API
        fetch(currentRequestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                let cityName = data.name;
                let currentDate = moment().format("MMMM Do, YYYY");
                let currentTemp = data.main.temp;
                let currentHumidity = data.main.humidity;
                let currentWindSpeed = data.wind.speed;

                // Create current title/border
                let currentTitle = $("<h2 class='mb-3 text-center'>");
                currentTitle.text("Current Weather: ");
                currentWeatherEl.addClass("current-weather-div");
                currentWeatherEl.append(currentTitle);

                // Create current city/date/icon
                let currentElCityName = $("<h3 class='mb-2'>");
                currentElCityName.text(cityName + " (" + currentDate + ") ");
                currentWeatherEl.append(currentElCityName);
                createCurrentWeatherIcon(data);

                // Create current temp
                let currentElTemp = $("<div class='my-3'>");
                currentElTemp.text("Current Temperature: " + currentTemp + " °F");
                currentWeatherEl.append(currentElTemp);

                // Create current humidity
                let currentElHumidity = $("<div class='my-3'>");
                currentElHumidity.text("Humidity: " + currentHumidity + "%");
                currentWeatherEl.append(currentElHumidity);

                // Create current wind speed
                let currentElWind = $("<div class='my-3'>");
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
                return response.json();
            })
            .then(function (data) {
                // console.log(data);
                // console.log(data.list);

                // Create an array of day objects @ 15:00
                let midayArray = [];
                for (var i = 0; i < data.list.length; i++) {
                    if (data.list[i].dt_txt.includes("15:00:00")) {
                        console.log(data.list[i]);
                        midayArray.push(data.list[i]);
                    }
                }
                console.log(midayArray);

                // Create 5 day title
                let forecastTitle = $("<h3 class='text-center p-2'>");
                forecastTitle.text("5-Day Forecast: ");
                fiveDayForecastEl.append(forecastTitle);

                // Iterate over midayArray and create each element
                for (var i = 0; i < midayArray.length; i++) {
                    let forecastDate = moment(midayArray[i].dt_txt).format("l");
                    let forecastTemp = midayArray[i].main.temp;
                    let forecastHumidity = midayArray[i].main.humidity;
                    let forecastIcon = midayArray[i].weather[0].icon;
                    
                    // create div for each day
                    let eachDayDiv = $("<div class='col-2 m-3 mb-6 p-3 border border-4 bg-primary forecast-day-div'>");
                    
                    // Create and add date to each div
                    let eachDayDate = $("<h5>");
                    eachDayDate.text(forecastDate);
                    eachDayDiv.append(eachDayDate);

                    function createforecastWeatherIcon(forecastIcon) {
                        if (forecastIcon === "01n") {
                            const nightClearIcon = $("<i class='fas fa-moon fa-2x'>");
                            eachDayDiv.append(nightClearIcon); // .css("display", 'inline')
                        }
                        else if (forecastIcon === "01d") {
                            const clearIcon = $("<i class='fas fa-sun fa-2x'>");
                            eachDayDiv.append(clearIcon); 
                        }
                        else if (forecastIcon === "02d") {
                            const cloudySunIcon = $("<i class='fas fa-cloud-sun fa-2x'>");
                            eachDayDiv.append(cloudySunIcon); 
                        }
                        else if (forecastIcon === "02n") {
                            const cloudyNightIcon = $("<i class='fas fa-cloud-moon fa-2x'>");
                            eachDayDiv.append(cloudyNightIcon); 
                        }
                        else if (forecastIcon === "03d" || "03n" || "04d" || "04n") {
                            const cloudyIcon = $("<i class='fas fa-cloud fa-2x'>");
                            eachDayDiv.append(cloudyIcon); 
                        }
                        else if (forecastIcon === "10d") {
                            const rainSunIcon = $("<i class='fas fa-cloud-sun-rain fa-2x'>");
                            eachDayDiv.append(rainSunIcon); 
                        }
                        else if (forecastIcon === "10n") {
                            const rainNightIcon = $("<i class='fas fa-cloud-moon-rain fa-2x'>");
                            eachDayDiv.append(rainNightIcon); 
                        }
                        else if (forecastIcon === "13d" || "13n") {
                            const snowIcon = $("<i class='far fa-snowflake fa-2x'>");
                            eachDayDiv.append(snowIcon); 
                        }
                        else if (forecastIcon === "09d" || "09n") {
                            const rainIcon = $("<i class='fas fa-cloud-showers-heavy fa-2x'>");
                            eachDayDiv.append(rainIcon); 
                        }
                        else if (forecastIcon === "11d" || "11n") {
                            const lightningIcon = $("<i class='fas fa-bolt fa-2x'>");
                            eachDayDiv.append(lightningIcon); 
                        }
                        else if (forecastIcon === "50d" || "50n") {
                            const crazyIcon = $("<i class='fas fa-radiation-alt fa-2x'>");
                            eachDayDiv.append(crazyIcon); 
                        }
                    }
                    createforecastWeatherIcon(forecastIcon);



                    // Create and add temp to each div
                    let eachDayTemp = $("<div>");
                    eachDayTemp.text("Temp: " + forecastTemp + " °F");
                    eachDayDiv.append(eachDayTemp);

                    // Create and add humidity to each div
                    let eachDayHumidity = $("<div>");
                    eachDayHumidity.text("Humidity: " + forecastHumidity + "%");
                    eachDayDiv.append(eachDayHumidity);

                    // Append each div to html element
                    fiveDayForecastEl.append(eachDayDiv);
                }
            });
    }

    // Retrieve search history from local storage
    function pullSearchHistory() {
        if (localStorage.getItem("searchHistory")) {
            searchHistory = JSON.parse(localStorage.getItem("searchHistory"))
            // console.log(searchHistory);
            for (var i = 0; i < searchHistory.length; i++) {
                let pastSearchButton = $("<button type='button' class='btn mb-1 col-10 past-search'>");
                pastSearchButton.text(searchHistory[i]);
                searchHitstoyEl.prepend(pastSearchButton);
            }
        // createClearButton();
        }
    }
    pullSearchHistory();


    $(".past-search").click(function(event) {
        event.preventDefault();
        // console.log(event.target);
        let city = event.target.textContent;
        currentWeatherEl.empty();
        fiveDayForecastEl.empty();
        console.log(city);
        generateCurrentWeather(city);
        generateFiveDayForecast(city);
    });

    // function createClearButton() {
    //     let executed = false;
    //     if (!executed) {
    //         executed = true;
    //         let searchHistoryClear = $("<button type='button' class='btn m-1 mt-2 col-12 clear-search'>");
    //         searchHistoryClear.text("Clear Search Histoy!");
    //         searchHitstoyEl.append(searchHistoryClear);
    //         searchHistory = [];
    //     } return executed;
    // }

    // $(".clear-search").click(function(event) {
    //     event.preventDefault()
    //     searchHitstoyEl.empty();
    //     localStorage.clear();
    // });

});