export const GeoScaler = (function() {

    //PRIVATE CODE BLOCK
    function x(range,domain) {
        let val;
        return function(d) {
            val = ((d+(range.x0*(-1)))/range.width)*(domain.width);
            return val.toFixed(0);
        }
    };

    function y(range,domain) {
        let val;
        return function(d) {
            val = domain.height-((d+(range.y0*(-1)))/range.height)*domain.height;
            return val.toFixed(0);
        }
    }

    //PUBLIC CODE BLOCK
    class GeoScaler {

        constructor(wrapper) {
            this.wrapper = wrapper;
            return this;
        };

        init() {
            return this;
        }

        getScale(range,domain) {
            console.log(range,domain);
            return {
                x: x(range,domain),
                y: y(range,domain)
            }
        }
    }

    return GeoScaler;

})();