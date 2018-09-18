import Vuebone from '../vendor/vuebone.js/index.js';
import { GeoAPI } from './scripts/services/geo/GeoAPI.js';

const source_name = "static/json/spain.geojson";
window.Vuebone = Vuebone;

const webApi = new Vuebone.WebApi();
const geoAPI = new GeoAPI();
const appView = new Vuebone.App({
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

appView.setRouter({
  "": (context,params) => {
    console.log(context);
  }
}).start(function(app) {
	webApi.get(source_name).done(function(response) {
		geoAPI.import(response).draw();	
	});
	geoAPI.attachCanvas(appView.el.firstChild);
});
