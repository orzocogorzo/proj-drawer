document.addEventListener("DOMContentLoaded", function() {
const API = (function() {
	const xmlRq = new XMLHttpRequest();
	xmlRq.responseType = "json";
	const promiser = new Object();
	
	class _API {
			constructor( base_url ) {
				this.root = base_url || '/';
			}

			get( url, callback, error ) {
				let _id = new Date().getTime() + "abcdefghijklmnopqrstvwxyz"[Math.floor(Math.random()*25+1)];
				
				promiser[_id] = new Object();

				xmlRq.open("GET",url,true);

				xmlRq.onload = (function(self) {
					return function() {
						(callback && callback(this.response)) || (promiser[_id].done && promiser[_id].done(this.response));
						delete promiser[_id];
					};
				})(this);

				xmlRq.onerror = (function(self) {
					return function() {
						(error && error(this)) || (promiser[_id].done && promiser[_id].done(this));
						delete promiser[_id];
					};
				})(this);

				xmlRq.send();

				return promiser[_id];	
			}
	}

	return _API;

})();

const GeoSizer = (function() {
	
		function _iterTillCoord(input,callback) {
			if (Array.isArray(input) && Array.isArray(input[0])) {
				input.map(function(item){_iterTillCoord(item,callback)});
			} else {
				callback(input);
			}
		};
			
		function _cross(coord,stored){
			stored.x0 = stored.x0 < coord[0] ? stored.x0 : coord[0];
			stored.x1 = stored.x1 > coord[0] ? stored.x1 : coord[0];
			stored.y0 = stored.y0 < coord[1] ? stored.y0 : coord[1];
			stored.y1 = stored.y1 > coord[1] ? stored.y1 : coord[1];
		};

	class GeoSizer {

		constructor(){};

		computeEdges(collection) {
			let edges = new Object();			
			collection.features.map(f => {
				f.geometry.coordinates.map(coord => _iterTillCoord(coord,(input) => _cross(input,edges)));
			});
			this.computeRanges(edges);
			this.computeDimensions(edges);
			return edges;
		};

		computeRanges(edges) {
			edges.range = Math.max(Math.abs(edges.x0 - edges.x1),Math.abs(edges.y0 - edges.y1));
		};

		computeDimensions(edges) {
 			edges.width = Math.abs(edges.x0 - edges.x1);
			edges.height = Math.abs(edges.y0 - edges.y1);
		};
	};

	return GeoSizer;

})();

const GeoDrawer = (function() {
	
	function _iterTillCoord(input,callback) {
		if (Array.isArray(input) && Array.isArray(input[0])) {
			input.map(function(item){_iterTillCoord(item,callback)});
		} else {
			callback(input);
		}
	};
	
	function _drawer(json) {
		if (json.type === "FeatureCollection") {
			json.features.map(f => _featureDrawer(d));
		} else if (json.type === "Feature") {
			_featureDrawer(json);
		}
	};

	function _featureDrawer(feat) {
		_clone = {
			"type": "Feature",
			"properties": feat.properties,
			"geometry": {
				"type": feat.geometry.type,
				"coordinates": []
			}
		};

		feat.geometry.coordinates.map(coord => {
			_iterTillCoord(coord,(function(edges){
				return (function(){
					(coord) => _reproject(coord,edges)
				)();
			)(	
		});
	};
	
	class GeoDrawer {
		constructor(el) {
			this.domain = el.getClientRects();
		};

		draw(collection) {
			let edges = geoSizer.computeEdges(collection);
		}
	};
	
	return GeoDrawer;
})();


const source_name = "spain-provinces.geojson";

var data;

const canvas = document.createElement("canvas");
canvas.id = "canvas";
document.body.appendChild(canvas);

const api = new API();
const geoSizer = new GeoSizer();
const geoDrawer = new GeoDrawer(canvas);

api.get(source_name).done = function(response) {
	geoDrawer.draw(response);
}

});
