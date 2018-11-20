import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import './plugins/element.js'
// import D3 from 'd3'

Vue.config.productionTip = false
Vue.use(VueResource)
/* eslint-disable */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
