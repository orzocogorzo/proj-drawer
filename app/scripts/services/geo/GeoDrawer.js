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

    function _pointDrawer(feature,context,scale) {

        context.strokeStyle = "#4f8";
        context.fillStyle = "#4f8";
  
        context.beginPath();
        context.arc(
          scale.x(f.geometry.coordinates[0]),
          scale.y(f.geometry.coordinates[1]),
          2, 0, 2 * Math.PI
        )
  
        context.stroke();
        context.fill();
    }

    function _polygonDrawer(feature,context,scale) {
        
        context.strokeStyle = "#4f8";
        context.fillStyle = "#4f8";

        context.beginPath();
        feature.geometry.coordinates.map(line => {
            line.map(point => {
                context.moveTo(
                    scale.x(point[0]),
                    scale.y(point[1])
                );
            });
        });
        context.closePath();
        context.stroke();
        context.fill();
    }

    function _multiPolygonDrawer(feature,context,scale) {
        
        context.lineCap = "round";
        context.lineWidth = 2;
        context.strokeStyle = "#fff";
        context.fillStyle = "#8fd";

        let firstPoint,lastPoint,enterPoint;
        feature.geometry.coordinates.map(poly => {
            poly.map(line => {
                firstPoint = true,
                lastPoint = [];
                context.beginPath();
                line.map(point => {
                    enterPoint = [scale.x(point[0]),scale.y(point[1])];
                    if (firstPoint) {
                        context.moveTo(
                            enterPoint[0],
                            enterPoint[1]
                        );
                        firstPoint = false;
                        return;    
                    } else if (lastPoint[0] != enterPoint[0] || lastPoint[1] != enterPoint[1]) {
                        context.lineTo(
                            enterPoint[0],
                            enterPoint[1]
                        );
                    };
                    lastPoint = enterPoint;
                });
                context.closePath();
                context.stroke();
                context.fill();
            });
        });
    }

    //PUBLIC CODE BLOCK
    class GeoDrawer {
        constructor(wrapper) {
            this.wrapper = wrapper;
            return this;
        };

        init(DOM) {
            this.ctx = DOM.ctx;
            return this;
        }

        draw() {
            this.wrapper.source_data.features.map(f => {
                switch (f.geometry.type) {
                    case ("Point"):
                        _pointDrawer(f,this.ctx,this.wrapper.scale);
                        break;
                    case ("LineString"):
                        _lineDrawer(f,this.ctx,this.wrapper.scale);
                        break;
                    case ("Polygon"):
                        _polygonDrawer(f,this.ctx,this.wrapper.scale);
                        break;
                    case ("MultiPolygon"):
                        _multiPolygonDrawer(f,this.ctx,this.wrapper.scale);
                        break;
                    case ("MultiLineString"):
                        _multiLineStringDrawer(f,this.ctx,this.wrapper.scale)
                        break;
                    case ("MultiPoint"):
                        _multiPointDrawer(f,this.ctx,this.wrapper.scale);
                        break;
                    default:
                        throw new Error("Unrecognized geometry type");
                };
            });
        };
    }

    return GeoDrawer;

})();