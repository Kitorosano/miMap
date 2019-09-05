
//SET MAP
const miMap = L.map('miMapid').setView([-32.317875, -58.085205], 18);
const attributions =
	'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>, Esteban Rosano & Felipe Caillabet';
const tileUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
const tiles = L.tileLayer(tileUrl, { attributions, maxZoom: 19, minZoom: 15, id: 'mapbox.streets', accessToken: 'pk.eyJ1Ijoia2l0b3Jvc2FubyIsImEiOiJjang0dXN0Z3gwZHBxNDRrajl0eWJnbWV1In0._JKXocT10c_LMSNjiRUEZw' });

tiles.addTo(miMap);

showIt();


async function showIt() {
	const localesData = await getData();
	//console.log(localesData);


	const Icons = [];
	const Markers = [];
	//ICON
	for (local of localesData) {
		let marker = L.marker([local.lat, local.lon]);
		marker.bindPopup("<b>" + local.name + " | " + "</b>" + local.type + "<br>" + local.hour + "<br>" + local.contact + "</br>");

		if (local.type != '') {

			let localIcon;
			localIcon = L.icon({
				iconUrl: 'Icons/' + local.type + '.png',
				iconSize: [24, 24],
				popupAnchor: [0, -15]
			});
			marker.setIcon(localIcon);

			Icons.push(localIcon);
		}

		marker.addTo(miMap);

		Markers.push(marker);


	}

	miMap.on('zoomend', function () {
		for (let i = 0; i < Markers.length; i++) {
			const zoom = miMap.getZoom() - 15;
			const w = 8 * zoom;
			const h = 8 * zoom;

			Icons[i].options.iconSize = [w, h];
			Icons[i].options.iconAnchor = [w / 2, h / 2];
			Icons[i].options.popupAnchor = [0, -15];

			// miMap.removeLayer(Markers[i]);
			// let latlng = Markers[i].getLatLng();
			// Markers[i] = L.marker([0, 0], { icon: Icons[i] }).addTo(miMap);
			// Markers[i].setLatLng(latlng);

			Markers[i].setIcon(Icons[i]);
		}

	});

	const newMarkers = [];
	miMap.on('click', function (e) {
		const newMarker = L.marker().setLatLng(e.latlng).addTo(miMap);
		newMarker.bindPopup(document.getElementById("input").value);
		// console.log(newMarker);
		newMarkers.push(newMarker);
	});


	const button = document.getElementById("btn btn-primary");
	button.addEventListener('click', async function () {
		const dataToSend = [];

		for (marker of newMarkers) {
			const lat = marker._latlng.lat;
			const lng = marker._latlng.lng;
			const content = marker._popup._content;
			dataToSend.push({ content, lat, lng });
		}

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(dataToSend)
		}
		const response = await fetch('/api', options);
		const data = await response.json();
		console.log(data);
	});

	// const IconLayer = L.layerGroup(allIcons);
	// const overlays = {
	// 	"Everything": IconLayer
	// };
	// L.control.layers(null, overlays).addTo(miMap);



}

async function getData() {
	const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSsOWCs5vSr5AKBFzDtkOzVfPFl3t3npUW1NP4wvEnZvgZmlz6uo59NuxHMf-kyAfewYr3wznkpFpw6/pub?gid=1093022415&single=true&output=csv';
	const response = await fetch(url);
	const data = await response.text();

	// console.log(data);
	const locales = [];

	const table = data.split('\n').slice(1);
	table.forEach(row => {
		const columns = row.split(',');

		const name = columns[0];
		const type = columns[1];
		const hour = columns[2];
		const contact = columns[3];
		const lat = columns[4];
		const lon = columns[5];

		locales.push({
			name,
			type,
			hour,
			contact,
			lat,
			lon
		});

	});
	return locales;
	// console.log(locales);
}



	// function onMapClick(e) {
	// 	const herePopup = L.popup();
	// 	herePopup
	// 		.setLatLng(e.latlng)
	// 		.setContent("You clicked the map at " + e.latlng.toString())
	// 		.openOn(miMap);
	// }
	// miMap.on('click', onMapClick);
