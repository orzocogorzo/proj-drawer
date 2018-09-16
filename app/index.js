import { WebAPI } from './scripts/services/WebApi.js';
import { GeoAPI } from './scripts/services/geo/GeoAPI.js';

document.addEventListener("DOMContentLoaded", function() {


	const source_name = "static/json/spain.geojson";

	const webApi = new WebAPI();
	const geoAPI = new GeoAPI();

	webApi.get(source_name).done(function(response) {
		geoAPI.import(response).draw();
	});

});
