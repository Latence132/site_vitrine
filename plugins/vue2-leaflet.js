import Vue from 'vue'
import Vue2Leaflet from 'vue2-leaflet'

Vue.use(Vue2Leaflet)

Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-marker', Vue2Leaflet.LMarker)
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)
Vue.component('l-popup', Vue2Leaflet.LPopup)

export default async () => {

}
