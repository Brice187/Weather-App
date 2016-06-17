var unit = "metric";

function showPosition(position) {
	'use strict';
	document.getElementById("data").innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
}

function changeUnit() {
	'use strict';
	if (unit === "metric") {
		unit = "imperial";
		document.getElementById("changeunit").innerHTML = "Imperial system";
	} else {
		unit = "metric";
		document.getElementById("changeunit").innerHTML = "Metric system";
	}
	getLocation();
}

function getWeatherForLocation(position) {
	'use strict';
	var lat = parseFloat(position.coords.latitude).toFixed(2);
	var lon = parseFloat(position.coords.longitude).toFixed(2);
	var json = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=" + unit + "&appid=5ea8cbbb99b8ef0874beab4865254419";

	$.getJSON(json, function (a) {
		document.getElementById("data").innerHTML =
			"Location: " + a.name + ", " + a.sys.country +
			"<br>Temperatur: " + a.main.temp + " " + getTempSystem(unit) +
			" degree<br>Condition: " + a.weather[0].main +
			"<br>Atmospheric pressure: " + a.main.pressure +
			"<br>Humidity: " + a.main.humidity +
			"<br>Wind Speed: " + a.wind.speed + " " + getDistSystem(unit);
		$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
				tags: a.weather[0].description
				, tagmode: "any"
				, format: "json"
			}
			, function (data) {
				$.each(data.items, function (i, item) {
					$("<img />").attr("src", item.media.m).replaceAll("#images");
					if (i === 0) {
						return false;
					};
				});
			});
	});
}
function getTempSystem(t) {
	if(t==="metric")
		return "celsius";
	else
		return "fahrenheit";
}
function getDistSystem(d) {
	if(d==="metric")
		return "meter/sec";
	else
		return "miles/hour";
}


function getLocation() {
	'use strict';
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getWeatherForLocation);
	} else {
		document.getElementById("data").innerHTML = "Geolocation is not supported by this browser.";
	}
}
