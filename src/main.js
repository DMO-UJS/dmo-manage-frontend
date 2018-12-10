import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store.js'
import VueResource from 'vue-resource'
import './plugins/element.js'

Vue.config.productionTip = false
Vue.use(VueResource)
/* eslint-disable */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
