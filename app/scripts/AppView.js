import { BaseView } from './_base/BaseView.js';

export const AppView = (function() {

    // PRIVATE CODE BLOCK

    // PUBLIC CODE BLOCK
    class AppView extends BaseView {
        constructor(config) {
            super(config);
            let d = new Date();
            this.on("before:render", () => {
                console.log("before:render", new Date() - d);
            });
            this.on("render", () => {
                console.log("render", new Date() - d);
                console.log("content attached: ", this.content);
            });
            this.on("after:render", () => {
                console.log("after:render", new Date() - d);
                setTimeout(this.remove,500);
            });
            this.on("before:dettach", () => {
                console.log("after:dettach", new Date() - d);
            });
            this.on("dettach", () => {
                console.log("dettach", new Date() - d);
                console.log("content dettached: ", this.content);
            });
            this.on("after:dettach", () => {
                console.log("afte:dettach", new Date() - d)
            });
            this.on("before:remove", () => {
                console.log("before:remove", new Date() - d);
            });
            this.on("remove", () => {
                console.log("remove", new Date() - d);
            });
            this.on("after:remove", () => {
                console.log("after:remove", new Date() - d);
            });
        }

    }

    return AppView;

})();
