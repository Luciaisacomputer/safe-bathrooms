import Vue from "vue";
import App from "./App.vue";
import "./scss/global.scss";


import VueMaterial from 'vue-material'
import { MdButton } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css' // This line here

Vue.use(MdButton)
Vue.use(VueMaterial)


Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
