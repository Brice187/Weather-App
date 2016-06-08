function showPosition(position) {
    'use strict';
    document.getElementById("data").innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude; 
}

function getLocation() {
    'use strict';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("data").innerHTML = "Geolocation is not supported by this browser.";
    }
}
