import Vue from "vue";
import App from "./App.vue";
import VueMaterial from 'vue-material'


// Global Style import
import "./scss/global.scss";

// Material Theme Imports
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'


/* This loads all the components for easy development but should
   be updated to only use the components we are actually loading
*/
Vue.use(VueMaterial)

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
