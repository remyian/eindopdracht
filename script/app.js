




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
});
