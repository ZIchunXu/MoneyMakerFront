// The Vue build version to load with the import command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from "axios";
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import DrVueEcharts from 'dr-vue-echarts';
Vue.prototype.$axios = axios;
Vue.prototype.$apiUrl = "https://money-maker.azurewebsites.net/";
Vue.use(DrVueEcharts)
Vue.use(ElementUI, { locale })
Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})