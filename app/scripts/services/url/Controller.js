import Vuewbone from "../../../../vendor/vuebone.js/index.js";

export class Controller extends Vuewbone.Controller {
  constructor (appInstance) {
    super(appInstance);
    this.routes = {
      '': this.redirectToDefault.bind( this ),
      'home': this.renderHome.bind( this ),  
      //'map/:section': this.renderSection.bind( this ),
    };
  };

  renderHome (params) {
    if (!this.initialized) {
      location.hash = '';
      return;
    };

    console.log(params);
    this.renderView(Vuewbone.BaseView, {
      id: "GeoViewer",
      "template": "<div>GeoViewer",
      "style": ""
    });
  }
}