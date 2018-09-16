import { GeoSizer } from './GeoSizer.js';
import { GeoDrawer } from './GeoDrawer.js';
import { GeoCanvas } from './GeoCanvas.js';
import { GeoScaler } from './GeoScaler.js';

export const GeoAPI = (function() {
    
    // PRIVATE CODE BLOC
    function _storeGeoJson(json) {
        if (json.type) {
            if (json.type === "FeatureCollection") {
                return json;
            } else if (json.type === "Feature") {
                return {
                    "type": "FeatureCollection",
                    "features": [json]
                }
            } else if (json.type === "Geometry") {
                return {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {},
                        "geometry": json
                    }]
                }
            } else {
                throw new Error("Unrecognized json format");
            }
        } else {
            throw new Error("Unrecognized json format");
        }
    }
    
    //PUBLIC CODE BLOCK
    class GeoAPI {
        constructor() {
            this.sizer = new GeoSizer(this).init();
            this.dom = new GeoCanvas(this).init();
            this.drawer = new GeoDrawer(this).init(this.dom);
            this.scaler = new GeoScaler(this).init();
        };

        import(geojson) {
            this.source_data = _storeGeoJson(geojson);
            this.range = this.sizer.dump(geojson);
            this.domain = this.dom.size();
            this.scale = this.scaler.getScale(this.range,this.domain);
            return this;
        };

        draw() {
            this.drawer.draw();
        }
    }

    return GeoAPI;

})();