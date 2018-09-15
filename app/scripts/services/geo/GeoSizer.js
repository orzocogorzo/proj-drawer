export const GeoSizer = (function() {
	
    // PRIVATE CODE BLOCK
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

    // PUBLIC CODE BLOCK
    class GeoSizer {

        constructor(wrapper){
            this.wrapper = wrapper;
            return this;
        };

        init() {
            return this;
        }

        dump(geojson) {
            let edges = new Object();

            switch (geojson) {
                case geojson.type === "FeatureCollection":
                    geojson.features.map(f => {
                        f.geometry.coordinates.map(coord => _iterTillCoord(coord,(input) => _cross(input,edges)));
                    });
                    break;
                case geojson.type === "Feature":
                    geojson.geometry.coordinates.map(coord => _iterTillCoord(coord,(input) => _cross(input,edges)));
                    break;
            };

            this.computeRanges(edges);
            this.computeSize(edges);

            return edges;
        };

        computeRanges(edges) {
            edges.range = Math.max(Math.abs(edges.x0 - edges.x1),Math.abs(edges.y0 - edges.y1));
        };

        computeSize(edges) {
            edges.width = Math.abs(edges.x0 - edges.x1);
            edges.height = Math.abs(edges.y0 - edges.y1);
        };
    };

    return GeoSizer;

})();