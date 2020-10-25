import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/local',
    name: 'LocalFilms',
    component: () => import(/* webpackChunkName: "local-films" */ '../views/local/localFilms.vue'),
  },
  {
    path: '/web/jp',
    name: 'WebFilms',
    component: () => import(/* webpackChunkName: "web-films" */ '../views/web/webFilms.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
