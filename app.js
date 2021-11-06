const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req, res) {
  const userCity = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+userCity+"&appid=d539cd28715e5ffcc5310d5008cbfaf2&units=metric";

  https.get(url, function(response) {
    response.on("data", function(data) {

      const weatherData = JSON.parse(data);
      const imgURL = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";

      res.write("<h1>"+userCity+"</h1>");
      res.write("<p>Temperature: "+weatherData.main.temp+"</p>");
      res.write("<p>The weather is "+weatherData.weather[0].description+"</p>");
      res.write("<img src="+imgURL+">");
      res.send();

    })
  })
})

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
