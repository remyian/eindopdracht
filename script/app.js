
const getTime = () =>{
	var d = new Date(); // for now
	document.querySelector('.js-local-time').innerText = d.getHours().toString() + ":"+d.getMinutes().toString();
	getCoordintes(); 
};



//stad ophalen aan de hand van de cooridinaten en LocationIQ api
function getCoordintes() { 
	var options = { 
		enableHighAccuracy: true, 
		timeout: 5000, 
		maximumAge: 0 
	}; 

	function success(pos) { 
		var crd = pos.coords; 
		var lat = crd.latitude.toString(); 
		var lng = crd.longitude.toString(); 
		var coordinates = [lat, lng]; 
		getCity(coordinates); 
		return; 

	} 

	function error(err) { 
		console.warn(`ERROR(${err.code}): ${err.message}`); 
	} 

	navigator.geolocation.getCurrentPosition(success, error, options); 
} 

function getCity(coordinates) { 
	var xhr = new XMLHttpRequest(); 
	var lat = coordinates[0]; 
	var lng = coordinates[1]; 

	xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.61d4f9658af8c096859f4e3fb152ba66&lat=" + lat + "&lon=" + lng + "&format=json", true); 
	xhr.send(); 
	xhr.onreadystatechange = processRequest; 
	xhr.addEventListener("readystatechange", processRequest, false); 

	function processRequest(e) { 
		if (xhr.readyState == 4 && xhr.status == 200) { 
			var response = JSON.parse(xhr.responseText); 
			var city = response.address.village; 
			document.querySelector('.js-location').innerText = city;
			return; 
		} 
	} 
} 




// 3 Met de data van de API kunnen we de app opvullen
const showResult = (queryResponse) => {
	console.log({queryResponse});
};

// 2 Aan de hand van een longitude en latitude gaan we de yahoo wheater API ophalen.
const getAPI = async(lat, lon) => {
	// Eerst bouwen we onze url op
    // Met de fetch API proberen we de data op te halen.
	const data = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lon}&timestamp=1458000000&key=AIzaSyCrG-QvISEJ5Bal_kfYY12N6QhW0JHSZDk`)
	.then((r)=> r.json())
	.catch((err)=> console.error('an arror accured:', err));
	console.log(data);
	// Als dat gelukt is, gaan we naar onze showResult functie.
	showResult(data);
};

document.addEventListener('DOMContentLoaded', function() {
	// 1 We will query the API with longitude and latitude.
	getAPI(50.8027841, 3.2097454);
	getTime();
});
