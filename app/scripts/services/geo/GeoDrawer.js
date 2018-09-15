export const GeoDrawer = (function() {

    //PRIVATE CODE BLOCK
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
				})();
			}));	
		});
    };

    //PUBLIC CODE BLOCK
    class GeoDrawer {
        constructor(wrapper) {
            this.wrapper = wrapper;
            return this;
        };

        draw() {
            console.log(this.wrapper.source_data);
        };
    }

    return GeoDrawer;

})();