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
            canvas.setAttribute("width","750");
            canvas.setAttribute("height","500");
            this.el = canvas;
            this.ctx = canvas.getContext("2d");

            let appContent = document.getElementById("content");
            appContent.appendChild(canvas);

            domain = this.el.getClientRects()[0];
            
            return this;
        };

        size() {
            return Object.freeze(domain);
        }
	};
	
	return DOMHandler;
})();