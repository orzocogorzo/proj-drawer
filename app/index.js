import { WebAPI } from './scripts/services/WebApi.js';
import { GeoAPI } from './scripts/services/geo/GeoAPI.js';
import { AppView } from './scripts/AppView.js';


const source_name = "static/json/spain.geojson";

const webApi = new WebAPI();
const geoAPI = new GeoAPI();
const appView = new AppView({
	el: '#content',
	template: '<div id="app">APP VIEW</div>',
	style: `#app {
				background-color: #45f;
				display: flex;
				justify-content: center;
				align-items: center;
			}`,
	data: {}
});

appView.ready(function() {
	webApi.get(source_name).done(function(response) {
		geoAPI.import(response).draw();	
	});
	appView.render();
	geoAPI.attachCanvas(appView.el.firstChild);
});
