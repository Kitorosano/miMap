//SET MAP
const attributions =
	'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>, Esteban Rosano & Felipe Caillabet';
const tileUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
const tiles = L.tileLayer(tileUrl, { attributions, zoomControl: true, maxZoom: 20, minZoom: 15, id: 'mapbox.streets', accessToken: 'pk.eyJ1Ijoia2l0b3Jvc2FubyIsImEiOiJjang0dXN0Z3gwZHBxNDRrajl0eWJnbWV1In0._JKXocT10c_LMSNjiRUEZw' });
const miMap = L.map('miMapid', { center: [-32.317074, -58.085594], zoom: 18, layers: [tiles] });

miMap.zoomControl.setPosition('bottomright');

let lc_24HS = L.layerGroup().addTo(miMap);
let lc_aseguradoras = L.layerGroup().addTo(miMap);
let lc_asesoría = L.layerGroup().addTo(miMap);
let lc_antel = L.layerGroup().addTo(miMap);
let lc_autos = L.layerGroup().addTo(miMap);
let lc_barracas = L.layerGroup().addTo(miMap);
let lc_bazar = L.layerGroup().addTo(miMap);
let lc_bicicletas = L.layerGroup().addTo(miMap);
let lc_boutique = L.layerGroup().addTo(miMap);
let lc_bancosCajeros = L.layerGroup().addTo(miMap);
let lc_casasMúsica = L.layerGroup().addTo(miMap);
let lc_casinoApuestas = L.layerGroup().addTo(miMap);
let lc_centroEducativo = L.layerGroup().addTo(miMap);
let lc_cine = L.layerGroup().addTo(miMap);
let lc_comida = L.layerGroup().addTo(miMap);
let lc_correo = L.layerGroup().addTo(miMap);
let lc_electroTecno = L.layerGroup().addTo(miMap);
let lc_semillerías = L.layerGroup().addTo(miMap);
let lc_estaciónServico = L.layerGroup().addTo(miMap);
let lc_farmacias = L.layerGroup().addTo(miMap);
let lc_floreria = L.layerGroup().addTo(miMap);
let lc_gimnasios = L.layerGroup().addTo(miMap);
let lc_hogar = L.layerGroup().addTo(miMap);
let lc_imprentas = L.layerGroup().addTo(miMap);
let lc_inmobiliarias = L.layerGroup().addTo(miMap);
let lc_joyería = L.layerGroup().addTo(miMap);
let lc_juguetería = L.layerGroup().addTo(miMap);
let lc_tiendaKiosko = L.layerGroup().addTo(miMap);
let lc_shopping = L.layerGroup().addTo(miMap);
let lc_libreríasBibliotecas = L.layerGroup().addTo(miMap);
let lc_panadería = L.layerGroup().addTo(miMap);
let lc_papeleríaRegaleria = L.layerGroup().addTo(miMap);
let lc_repuestos = L.layerGroup().addTo(miMap);
let lc_ropa = L.layerGroup().addTo(miMap);
let lc_vidrierías = L.layerGroup().addTo(miMap);
let lc_zapatería = L.layerGroup().addTo(miMap);


const Icons = [];
const Markers = [];

showIt();
async function showIt() {
	/*CALLS getData() AND WAITS FOR IT*/
	const localesData = await getData();



	/*LOOPS TO WORK WITH EVERY LOCAL*/
	for (local of localesData) {
		const name = local.name;
		const type = local.type;
		const contact = local.contact;
		const hour = local.hour;

		let marker = L.marker([local.lat, local.lon], { draggable: false });
		// marker.bindPopup("<b>" + name + " | " + "</b>" + type + "<br>" + hour + "<br>" + contact + "</br>");

		/*CREATING ICON ONLY IF IT HAS A TYPE*/
		if (local.type != '') {
			let localIcon;
			localIcon = L.icon({
				iconUrl: 'Icons/' + local.type + '.png',
				iconSize: [24, 24],
				popupAnchor: [0, -15]
			});
			marker.setIcon(localIcon);

			Icons.push(localIcon);
		} else {
			let localIcon;
			localIcon = L.icon({
				iconUrl: 'css/images/marker-icon.png',
				iconSize: [24, 24],
				popupAnchor: [0, -15]
			});
			marker.setIcon(localIcon);

			Icons.push(localIcon);
		}

		// marker.addTo(miMap);
		Markers.push(marker);

		/*FUNCTION TO MOVE NEWMARKERS AND KNOW IT NEW LATLNG */
		// marker.on('dragend', function (e) {
		// 	alert(marker.getLatLng().toString());
		// });

		marker.on('click', function (e) {
			$('#localInfo').collapse('toggle');
			if (hour) {
				const result = parseHour(hour);
				console.log(result);
				for (dia of result) {
					for (time of dia) {
						document.getElementById(time.id).textContent = time.hora;
					}
				}

			}
			document.getElementById('localName').textContent = name;
			document.getElementById('localType').textContent = type;
			document.getElementById('localContact').textContent = contact;

		});

		/* Creation of Layer Groups*/

	if (local.type == '24HS') { marker.addTo(lc_24HS); } else
	if (local.type == 'Seguro' || local.type == 'Seguro de auto') { marker.addTo(lc_aseguradoras); } else
	if (local.type == 'Asesoria') { marker.addTo(lc_asesoría); } else
	if (local.type == 'Antel') { marker.addTo(lc_antel); } else
	if (local.type == 'Autos') { marker.addTo(lc_autos); } else
	if (local.type == 'Biblioteca' || local.type == 'Libreria') { marker.addTo(lc_libreríasBibliotecas); } else
	if (local.type == 'Barraca') { marker.addTo(lc_barracas); } else
	if (local.type == 'Bazar') { marker.addTo(lc_bazar); } else
	if (local.type == 'Banco' || local.type == 'Cajero') { marker.addTo(lc_bancosCajeros); } else
	if (local.type == 'Bicicletas') { marker.addTo(lc_bicicletas); } else
	if (local.type == 'Boutique') { marker.addTo(lc_boutique); } else
	if (local.type == 'Casa de musica') { marker.addTo(lc_casasMúsica); } else
	if (local.type == 'Suerte') { marker.addTo(lc_casinoApuestas); } else
	if (local.type == 'Centro educativo') { marker.addTo(lc_centroEducativo); } else
	if (local.type == 'Cine') { marker.addTo(lc_cine); } else
	if (local.type == 'Comida') { marker.addTo(lc_comida); } else
	if (local.type == 'Correo') { marker.addTo(lc_correo); } else
	if (local.type == 'Electronica' || local.type == 'Tecnologia') { marker.addTo(lc_electroTecno); } else
	if (local.type == 'Estacion de servicio') { marker.addTo(lc_estaciónServico); } else
	if (local.type == 'Farmacia') { marker.addTo(lc_farmacias); } else
	if (local.type == 'Floreria') { marker.addTo(lc_floreria); } else
	if (local.type == 'Gimnasio') { lc_gimnasios.addLayer(marker); } else
	if (local.type == 'Hogar') { lc_hogar.addLayer(marker); } else
	if (local.type == 'Imprenta') { lc_imprentas.addLayer(marker); } else
	if (local.type == 'Inmobiliaria') { lc_inmobiliarias.addLayer(marker); } else
	if (local.type == 'Joyeria') { lc_joyería.addLayer(marker); } else
	if (local.type == 'Jugueteria') { lc_juguetería.addLayer(marker); } else
	if (local.type == 'Kiosko' || local.type == 'Tienda') { lc_tiendaKiosko.addLayer(marker); } else
	if (local.type == 'Panaderia') { lc_panadería.addLayer(marker); } else
	if (local.type == 'Papeleria' || local.type == 'Regaleria') { lc_papeleríaRegaleria.addLayer(marker); } else
	if (local.type == 'Repuestos') { lc_repuestos.addLayer(marker); } else
	if (local.type == 'Ropa') { lc_ropa.addLayer(marker); } else
	if (local.type == 'Semilleria') { lc_semillerías.addLayer(marker); } else
	if (local.type == 'Shopping') { lc_shopping.addLayer(marker); } else
	if (local.type == 'Vidrieria') { lc_vidrierías.addLayer(marker); } else
	if (local.type == 'Zapateria') { lc_zapatería.addLayer(marker); }

	};

	
	let layerLocales = {
		"24 HORAS": lc_24HS,
		"Aseguradora": lc_aseguradoras,
		"Asesoria": lc_asesoría,
		"Antel": lc_antel,
		"Autos": lc_autos,
		"Cajeros y Bancos": lc_bancosCajeros,
		"Boutique": lc_boutique,
		"Bicicletas": lc_bicicletas,
		"Liberia y Biblioteca": lc_libreríasBibliotecas,
		"Barraca": lc_barracas,
		"Bazar": lc_bazar,
		"Casa de Musica": lc_casasMúsica,
		"Casino y Apuestas": lc_casinoApuestas,
		"Centro Educativo": lc_centroEducativo,
		"Cine": lc_cine,
		"Comida": lc_comida,
		"Correo": lc_correo,
		"Electronica y Tecnologia": lc_electroTecno,
		"Estacion de Servicio": lc_estaciónServico,
		"Farmacia": lc_farmacias,
		"Floreria": lc_floreria,
		"Gimnasio": lc_gimnasios,
		"Articulos para Hogar": lc_hogar,
		"Imprenta": lc_imprentas,
		"Inmobiliaria": lc_inmobiliarias,
		"Joyeria": lc_joyería,
		"Jugueteria": lc_juguetería,
		"Kioskos y Tiendas": lc_tiendaKiosko,
		"Papeleria y Regaleria": lc_papeleríaRegaleria,
		"Panaderia": lc_panadería,
		"Repuestos": lc_repuestos,
		"Ropa": lc_ropa,
		"Semilleria": lc_semillerías,
		"Shopping": lc_shopping,
		"Vidrieria": lc_vidrierías,
		"Zapateria": lc_zapatería,
	};

	L.control.layers(null, layerLocales).setPosition('topleft').addTo(miMap);
}

/*GET DATA FUNCION, CALLED BY showIt() */
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


function parseHour(hour) {
	//Separating from spacing
	const days = hour.split(' ');
	let semana;
	for (d of days) {
		//getting the obvius days
		const day = d.split(/\x28/);
		const hora = day[1].split(/\x29/).slice(0, 1).toString();

		if (day[0].length > 1) {
			const elt = day[0].split('');
			semana = knowDay(elt, hora);

		} else {
			const week = ['L', 'M', 'Mi', 'J', 'V', 'S', 'D'];
			const horarios = hora.split('_');
			const horaM = horarios[0];
			const horaT = horarios[1];

			for (dia of week) {
				if (dia == day[0]) {
					const dias = [];
					const diaM = { id: dia + 'm', hora: horaM };
					const diaT = { id: dia + 't', hora: horaT };

					dias.push(diaM, diaT);
					semana.push(dias);
				}
			}
		}
	}
	return semana;
}

function knowDay(day1, hora) {
	const semana = [];
	const week = ['L', 'M', 'Mi', 'J', 'V', 'S', 'D'];
	let pass = false;

	const horarios = hora.split('_');
	const horaM = horarios[0];
	const horaT = horarios[1];

	for (dia of week) {
		const dias = [];

		if (pass) {
			if (dia != day1[2]) {
				const diaM = { id: dia + 'm', hora: horaM };
				const diaT = { id: dia + 't', hora: horaT };
				dias.push(diaM, diaT);
				semana.push(dias);
			} else {
				const diaM = { id: dia + 'm', hora: horaM };
				const diaT = { id: dia + 't', hora: horaT };
				dias.push(diaM, diaT);
				semana.push(dias);

				pass = false;
			}
		}

		if (dia == day1[0]) {
			const diaM = { id: dia + 'm', hora: horaM };
			const diaT = { id: dia + 't', hora: horaT };
			dias.push(diaM, diaT);
			semana.push(dias);

			pass = true;
		}

	}
	return semana;
}



/*FUNCION TO RESIZE ICONS FROM ZOOM */
miMap.on('zoomend', function () {
	for (let i = 0; i < Markers.length; i++) {
		let w, h;
		if (miMap.getZoom() === 20) {
			w = 45;
			h = 45;
		} else {
			const zoom = miMap.getZoom() - 15;
			w = 8 * zoom + 1;
			h = 8 * zoom + 1;
		}

		Icons[i].options.iconSize = [w, h];
		Icons[i].options.iconAnchor = [w / 2, h / 2];
		Icons[i].options.popupAnchor = [0, -15];

		Markers[i].setIcon(Icons[i]);
	}
});

// /*CREATE NEW MARKERS FORM CLICKING */
// const newMarkers = [];
// miMap.on('click', function (e) {
// 	const newMarker = L.marker([], { draggable: true }).setLatLng(e.latlng).addTo(miMap);
// 	// newMarker.bindPopup(document.getElementById("input").value);
// 	// console.log(newMarker);
// 	newMarkers.push(newMarker);

// 	/*FUNCTION TO MOVE NEWMARKERS AND KNOW IT NEW LATLNG */
// 	newMarker.on('dragend', function (e) {
// 		alert(newMarker.getLatLng().toString());
// 	});

// });

// /*HAVE A INPUT TO CREATE MARKER CONTENT */
// const button = document.getElementById("btn btn-primary");
// button.addEventListener('click', async function () {
// 	const dataToSend = [];

// 	for (marker of newMarkers) {
// 		const lat = marker._latlng.lat;
// 		const lng = marker._latlng.lng;
// 		const content = marker._popup._content;
// 		dataToSend.push({ content, lat, lng });
// 	}

// 	const options = {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify(dataToSend)
// 	}
// 	const response = await fetch('/api', options);
// 	const data = await response.json();
// 	console.log(data);
// });