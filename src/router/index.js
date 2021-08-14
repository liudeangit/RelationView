import Vue from 'vue'
import Router from 'vue-router'
import test from '@/components/3d'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '3dView',
      component: () => import(/* webpackChunkName: "about" */ '@/components/3d')
    },
    {
      path: '/2dView',
      name: '2dView',
      component: () => import(/* webpackChunkName: "about" */ '@/components/2d')
    },
  ]
})
