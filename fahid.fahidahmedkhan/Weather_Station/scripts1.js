$(document).ready(function() {
  $("#interval_div").hide();
  let e = "home";
  const API_ADDRESS = "http://webapi19sa-1.course.tamk.cloud/v1/weather";

  const API_ADDRESS_Humidty_out =
    "http://webapi19sa-1.course.tamk.cloud/v1/weather/humidity_out";
  $("#title_div").html(
    '<h1>Welcome to the weather station of Fahid!</h1> <img id="img" src ="Level.png"class =img-responsive >'
  );

  /***
      HOME section begins
    */

  $("#home").click(function() {
    location.reload();
  });

  /***
      HOME section ends
    */

  /***
      TEMPERATURE section begins
  
  
  
    */

  // WORK IN PROGRESS

  $("#temperature").click(function() {
    $("#title_div").html("<h1>Temperature</h1>");
    $("#explanation_div").html(
      "Temperature data is on the table and line chart"
    );
    $("#interval_div").show();
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

    drawTemperatureData(API_ADDRESS);
  });

  /***
      TEMPERATURE section ends
    */

  /***
      WIND SPEED section begins
    */

  $("#wind_speed").click(function() {
    $("#title_div").html("<h1>Wind speed</h1>");
    $("#explanation_div").html("...");
    $("#interval_div").show();
    $("#data_div").html(
      '<canvas id="myChart" width="400" height="400"></canvas>'
    );
    drawWindspeedChart(API_ADDRESS);
  });

  $("#Rain").click(function() {
    $("#title_div").html("<h1>Rain-Data</h1>");
    $("#interval_div").show();
    $("#explanation_div").html("Rain data sheet on the table");
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

    drawRainData(API_ADDRESS);
  });

  /***
      WIND SPEED section ends
    */

  /***
      HUMIDITY section begins
    */
  $("#humidity").click(function() {
    $("#title_div").html("<h1>Humidity</h1>");
    $("#interval_div").show();
    $("#explanation_div").html("Humidity data on the table");
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

    drawHumidityData(API_ADDRESS);
  });

  /***
      HUMIDITY section ends
    */

  /***
      LAST VALUES section begins
    */

  $("#last_values").click(function() {
    $("#title_div").html("<h1>Last values</h1>");
    $("#interval_div").show();
    $("#explanation_div").html("Last 500 values on the table");
    lastValues(API_ADDRESS);
  });

  /***
      LAST VALUES section ends
    */

  /***
      EXAMPLE section begins
    */

  $("#example").click(function() {
    $("#title_div").html("<h1>API-DATA</h1>");
    $("#interval_div").show();
    $("#explanation_div").html(
      "This is an api data tab for fetching data from direct api address."
    );
    exampleFunction(API_ADDRESS);
  });

  /***
      EXAMPLE section ends
    */

  /***
      LAST20measurementsTemperature section begins
    */

  $("#Temperature_out").click(function() {
    $("#title_div").html("<h1>Last 20 values of Outside Temperature.</h1>");
    $("#interval_div").show();
    $("#explanation_div").html("Last 20 values of outside ");
    Temperatureout(API_ADDRESS);
  });

  $("#free_choice").click(function() {
    $("#title_div").html("<h1>Free_Choice</h1>");
    $("#explanation_div").html("Free Choice data is given below");
    $("#gauge_div").show();
    $("#selectNameDiv").show();
    $("#chart_div").hide();
    $("#interval_div").show();
    $("#systemPicture").hide();
    $("#systemPicture2").hide();
    free_choice(api);
  });
  /***
    LAST20measurementsTemperature section ends
    */

  /***
      
  Humidity_out section begins
    */

  $("#Humidity_out").click(function() {
    $("#title_div").html("<h1>Last 20 Humidity values of outside</h1>");
    $("#interval_div").show();
    $("#explanation_div").html("Last 20 values of outside humidity");
    Humidityout(API_ADDRESS_Humidty_out);
  });

  /***
    Humidity_out section ends
    */
  /***
   wind_speed_out section begins
   */

  $("#wind_speed_out").click(function() {
    $("#title_div").html("<h1>Wind speed outside</h1>");
    $("#interval_div").show();
    $("#explanation_div").html("...");
    $("#data_div").html(
      '<canvas id="myChart" width="400" height="400"></canvas>'
    );
    drawwindspeedData(API_ADDRESS);
  });
  /***
   wind_speed_out section ends
    */
});
