import Vue from "vue";
import Vuex from "vuex";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/vi";
import VueScreenSize from "vue-screen-size";
import App from "./App.vue";
import store from "./store";
import "./index.css";
import "./assets/tailwind.css";

Vue.use(Vuex);
Vue.use(ElementUI, { locale });
Vue.use(VueScreenSize);
Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
