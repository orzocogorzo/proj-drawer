export const GeoCanvas = (function() {
	
    //PRIVATE CODE BLOCK    
    let domain;
	
    //PUBLIC CODE BLOCK
    class GeoCanvas {
		constructor(wrapper) {
            this.wrapper = wrapper;
            return this;
        };
        
        init() {
            const canvas = document.createElement("canvas");
            canvas.id = "canvas";
            canvas.setAttribute("width","750");
            canvas.setAttribute("height","500");
            this.el = canvas;
            this.ctx = canvas.getContext("2d");
            return this;
        };

        attach(el) {
            el.appendChild(this.el);
            domain = this.el.getClientRects()[0];
        };

        size() {
            return Object.freeze(domain);
        }
	};
	
	return GeoCanvas;
})();