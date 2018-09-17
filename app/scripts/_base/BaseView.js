import { LifeCycle } from "./LifeCycle.js";
import { Dispatcher } from "./Dispatcher.js";
import { Reactive } from "./Reactive.js";

export const BaseView = (function() {

    // PRIVATE CODE BLOCK    
    function _bindDOMReady() {
        const promise = {
            done: function(callback) {
                this.done = function(event) {
                    callback(event);
                };
            }
        };

        document.addEventListener("DOMContentLoaded", function(e) {
            promise.done(e);
        }); 

        return promise;
    }

    function _initializer(config) {

        if (config.el instanceof HTMLElement) {
            this.el = config.el;
        } else if (typeof config.el == "string") {
            config.el = document.querySelector(config.el);
            if (config.el instanceof HTMLElement) {
                this.el = config.el;
            } else {
                throw new Error("Not el defined");
            }
        } else {
            throw new Error("Not el defined");
        }

        typeof _ready == "function" && _ready();
    };

    function _styleEncapsulator(styleText,id){
        return `<style id="${id}">${styleText.replace(/\s/g,'')}</style>`
    };

    function _htmlParser(templateStr) {
        let htmlParser = document.createElement("template");
        htmlParser.innerHTML = templateStr;
        return htmlParser.content;
    };

    function _idGen() {
        return Array.apply(null,Array(15)).map(_ => "-abcdefghijklmnopqrstvwxyxABCDEFGHIJKLMNOPQRSTVWXYZ1234567890_"[Math.floor(Math.random()*62)]).join("");
    }

    let _id, _content, _ready;

    // PUBLIC CODE BLOCK
    class BaseView {
        constructor(config) {
            if (!window.__root_attached) {
                _bindDOMReady().done((function(self) {
                    return function() {
                        _initializer.bind(self)(config);
                        window.__root_attached = true; 
                    };
                })(this));                           
            } else if (!config.home) {
                throw new Error("Only one view can exist in as a root viewClass");
            } else {
                _initializer.bind(this)(config);
            };

            new Dispatcher(this);
            new LifeCycle(this);

            _id = _idGen();
            this.id = config.id || _id;
            this.template = config.template;
            this.style = _styleEncapsulator(config.style,_id);
            this.data = new Reactive(config.data || new Object(), this.render);
        };

        ready(callback) {
            _ready = callback
        }

        render() {
            let templateString;

            if (typeof this.template == "string") {
                templateString = this.template;
            } else if (typeof this.template == "function") {
                templateString = this.template(this.data);
            } else {
                throw new Error("Unrecognized template format");
            };

            document.head.appendChild(
                _htmlParser(this.style)
            );
            this.el.appendChild(_htmlParser(templateString));
            // this.el.attachShadow({mode:'open'}).appendChild(_htmlParser(this.style+templateString));
            this.rendered = true;

            return this; 
        }

        dettach() {
            this.el.innerHTML = "";
            document.head.removeChild(document.getElementById(_id));
            return this;
        }

        remove() {
            if (this.parent) {
                this.parent.removeChild(this);
            } else {
                throw new Error("You cant remove the app root view");
            }
        }

        addChild(Child,config) {
            config.home = this;
            config.id = config.id;
            let child = new Child(config);
            _childs[config._id] = child;
            return child;
        };

        dettachChild(child) {
            child.dettach();
            return child;
        };

        removeChild(child) {
            child.dettach();
            delete _childs[child._id];
        };

        get _id() {
            return _id;
        }

        get content() {
            return _content;
        }
    }

    return BaseView;

})();
