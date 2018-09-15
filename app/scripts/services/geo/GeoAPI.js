import { GeoSizer } from './GeoSizer.js';
import { GeoDrawer } from './GeoDrawer.js';
import { DOMHandler } from './DomHandler.js';

export class GeoAPI {
    constructor() {
        this.sizer = new GeoSizer(this).init();
        this.dom = new DOMHandler(this).init();
        this.drawer = new GeoDrawer(this).init();
    };

    import(geojson) {
        this.source_data = geojson;
        this.range = this.sizer.dump(geojson);
        this.domain = this.dom.size(); 
        return this;
    };

    draw() {
        this.drawer.draw();
    }
}