export const DOMHandler = (function() {
	
    //PRIVATE CODE BLOCK    
    let domain;
	
    //PUBLIC CODE BLOCK
    class DOMHandler {
		constructor(wrapper) {
            this.wrapper = wrapper;
            return this;
        };
        
        init() {
            const canvas = document.createElement("canvas");
            canvas.id = "canvas";
            this.el = canvas;

            let appContent = document.getElementById("content");
            appContent.appendChild(canvas);

            domain = this.el.getClientRects();
            
            return this;
        };

        size() {
            return Object.freeze(domain);
        }
	};
	
	return DOMHandler;
})();