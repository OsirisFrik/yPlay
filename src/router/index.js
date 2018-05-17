import Vue from 'vue'
import Router from 'vue-router'

import Home from '../Pages/Home'
import Room from '../Pages/Room'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/:room',
      name: 'Room',
      component: Room
    }
  ],
  mode: 'history'
})
