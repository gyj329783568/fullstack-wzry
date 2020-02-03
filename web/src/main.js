import Vue from 'vue'
import App from './App.vue'
import './styles/styles.scss'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
import './mock'
import http from './http'
Vue.prototype.$http = http
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.config.productionTip = false

import Card from "./components/Card";
Vue.component('m-card', Card)

import ListCard from "./components/ListCard";
Vue.component('m-list-card', ListCard)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
