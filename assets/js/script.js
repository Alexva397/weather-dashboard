
let searchForm = $("#searchForm");
let searchHitstoyEl = $("#searchHistory")
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "affc76011fc8733569fa53103a2a2374";

searchBtn.on("click", function() {
    // if (userCityInput === "") {
    //     window.alert("You must enter a city name to view a weather report!");
    // }
    let userCitySearch = userCityInput.val();
    console.log(userCitySearch);
    
    const userRequestUrl = baseUrl + "q=" + userCitySearch + "&appid=" + apiKey;
    // const userRequestUrl = `${baseUrl}q=${userCitySearch}&appid=${apiKey}`;

    fetch(userRequestUrl)
    .then(function (response) {
        console.log(response);
        console.log(response.status);
        if (response.status !== 200) {
            console.log("error");
        }
    return response.json();
    })
    .then (function (data) {
        console.log(data);
    });


});

$(document).ready(function() {

    searchForm.submit(function(event) {
        event.preventDefault();
    });
   
});






