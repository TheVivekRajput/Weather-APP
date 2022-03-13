$(document).ready(function() {
    $("#form-sub").submit(function(event) { 
        performSearch(event); });
  });

  //performing the searh
  function performSearch(event) {
    var request;
    event.preventDefault();
    $("#city-name").text("Finding ...");
    $("#city-temp").text("");
    $("img").attr('src', "");
    $("#city-weather").text("");
    $("#city-pressure").text("");
    $("#city-humidity").text("");
    $("#min-temp").text("");  
    $("#max-temp").text("");

  
    // Sending the request
    request = $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather',
        type: "GET",
        data: { q: $("#city").val(), 
                appid: 'b86eb94c73325e579fb7152ff727171d', 
                units: 'metric'}
    });
  
    // Callback handler for success
    request.done(function (response){
        formatSearchResults(response);
    });
    
    // Callback handler for failure
    request.fail(function (){
        $("#city-name").text("Try again, incorrect input !!");
        $("#city-temp").text("");
        $("img").attr('src', "");
        $("#city-weather").text("");
        $("#city-pressure").text("");
        $("#city-humidity").text("");
        $("#min-temp").text("");  
        $("#max-temp").text("");
    });
  }

  //getting the search result
  function formatSearchResults(jsonObject) {
    
    var city_name = jsonObject.name;
    city_name = city_name + ", " + jsonObject.sys.country;
    var city_weather = jsonObject.weather[0].main;
    var city_temp = jsonObject.main.temp;
    var city_pressure = jsonObject.main.pressure;
    var city_humidity = jsonObject.main.humidity;
    var min_temp = jsonObject.main.temp_min;
    var max_temp = jsonObject.main.temp_max;

    var imgurl  = 'http://openweathermap.org/img/wn/' + jsonObject.weather[0].icon + '@2x.png';
    $("img").attr('src', imgurl);
    $("#city-name").text(city_name);
    $("#city-weather").text(city_weather);
    $("#city-pressure").text("Pressure : "+city_pressure);
    $("#city-humidity").text("Humidity : "+city_humidity);
    $("#city-temp").text("Temperature : "+city_temp+" Celsius"); 
    $("#min-temp").text("Minimum Temperature : "+min_temp+" Celsius");  
    $("#max-temp").text("Maximum Temperature : " +max_temp+" Celsius");  

  }
