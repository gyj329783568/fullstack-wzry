import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import http from './http'
import './styles.css'
import * as filters from './filters'
import _ from 'lodash'
Vue.prototype._ = _
Vue.prototype.$http = http
Vue.config.productionTip = false
Vue.use(ElementUI)

console.log(filters)
// global filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
