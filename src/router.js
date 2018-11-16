import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Class from './views/Class.vue'
import Properties from './views/Properties.vue'
import Test from './views/Test.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App,
      children: [
      {
        path: '',
        name: "home",
        component: Home
      },
      {
        path: 'class',
        name: "class",
        component: Class
      },
      {
        path: 'properties',
        name: 'properties',
        component: Properties
      },
      {
        path: 'test',
        name: 'test',
        component: Test
      }]
    },
  ]
})
