import { WebAPI } from './scripts/services/WebApi.js';
import { GeoAPI } from './scripts/services/geo/GeoAPI.js';
import { AppView } from './scripts/AppView.js';


const source_name = "static/json/spain.geojson";

const webApi = new WebAPI();
const geoAPI = new GeoAPI();
const appView = new AppView({
	el: '#content',
	template: '<div class="app-view">APP VIEW</div>',
	style: `#content {
				background: #45f;
			}`,
	data: {}
});

appView.ready(function() {
	appView.render();
	webApi.get(source_name).done(function(response) {
		geoAPI.import(response).draw();	
	});
});
