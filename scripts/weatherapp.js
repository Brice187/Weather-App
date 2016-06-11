var unit = "metric";

function showPosition(position) {
	'use strict';
	document.getElementById("data").innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
}

function changeUnit() {
	'use strict';
	if (unit === "metric") {
		unit = "imperial";
		document.getElementById("changeunit").innerHTML = "Fahrenheit";
	} else {
		unit = "metric";
		document.getElementById("changeunit").innerHTML = "Celsius";
	}
	getLocation();
}

function getWeatherForLocation(position) {
	'use strict';
	var lat = parseFloat(position.coords.latitude).toFixed(2);
	var lon = parseFloat(position.coords.longitude).toFixed(2);
	var json = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=" + unit + "&appid=5ea8cbbb99b8ef0874beab4865254419";

	$.getJSON(json, function (a) {

		document.getElementById("data").innerHTML = "Temperatur: " + a.main.temp + " " + unit + " degree<br>Condition: " + a.weather[0].main + "<br>Description: " + a.weather[0].description + "<br>City: " + a.name;
		$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
				tags: a.weather[0].main
				, tagmode: "any"
				, format: "json"
			}
			, function (data) {
				$.each(data.items, function (i, item) {
					$("<img />").attr("src", item.media.m).replaceAll("#images");
					if (i === 0) {
						return false
					};
				});
			});
	});
}

function getLocation() {
	'use strict';
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getWeatherForLocation);
	} else {
		document.getElementById("data").innerHTML = "Geolocation is not supported by this browser.";
	}
}
