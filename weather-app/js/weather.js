
var callbackFunction = function(data) {
    var weather = data.query.results.channel.item.condition;
    var area = data.query.results.channel.location;
    document.getElementById('location').innerHTML = area.city + ", " + area.region;
    document.getElementById('weatherdate').innerHTML = weather.date;
    document.getElementById('weatherother').innerHTML = weather.text + " | " + weather.temp + " F";
    var weather2 = data.query.results.channel.item;
    document.getElementById('nextday').style.display = "block";
    document.getElementById('nextday1').style.display = "block";
    document.getElementById('nextday').innerHTML = weather2.forecast[1].day + ", " + weather2.forecast[1].date + ": " + weather2.forecast[1].text + " (High: " + weather2.forecast[1].high+ " Low: " + weather2.forecast[1].low + ")";
    document.getElementById('nextday1').innerHTML = weather2.forecast[2].day + ", " + weather2.forecast[2].date + ": " + weather2.forecast[2].text + " (High: " + weather2.forecast[2].high+ " Low: " + weather2.forecast[2].low + ")";

};
function WeatherFunction1() {
    var zipcode = document.getElementById("codeInput").value;
    var script = document.createElement('script');
    script.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + zipcode + "')&format=json&callback=callbackFunction";
    document.getElementsByTagName('head')[0].appendChild(script);    
}
function WeatherFunction() {
    if(event.keyCode == 13) {
        var zipcode = document.getElementById("codeInput").value;
        var script = document.createElement('script');
        script.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + zipcode + "')&format=json&callback=callbackFunction";
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    return false;
}

function geoFindMe() {
  if (!navigator.geolocation){
    alert("Geolocation is not supported by your browser");
    return;
  }
    
  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=AIzaSyCfhTsicoP-fvcPrnWvZ99v4PpHoGBsMls";

    $.getJSON(url, function(data) {
        var zipcode = data.results[0].address_components[7].long_name;
        var script = document.createElement('script');
        script.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + zipcode + "')&format=json&callback=callbackFunction";
        document.getElementsByTagName('head')[0].appendChild(script); 
    });
    
  }

  function error() {
    alert("Unable to retrieve your location");
  }
  document.getElementById('location').innerHTML = "Locating...";
  navigator.geolocation.getCurrentPosition(success, error);
}

    