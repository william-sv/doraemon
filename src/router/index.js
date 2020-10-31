import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/local',
    name: 'LocalFilms',
    component: () => import(/* webpackChunkName: "local-page" */ '../views/local/localPage.vue'),
  },
  {
    path: '/web/jp',
    name: 'WebFilms',
    component: () => import(/* webpackChunkName: "web-jp" */ '../views/web/jpPage.vue'),
  },
  {
    path: '/library',
    name: 'Library',
    component: () => import(/* webpackChunkName: "library-page" */ '../views/setting/libraryPage.vue'),
  },
  {
    path: '/playlist',
    name: 'Playlist',
    component: () => import(/* webpackChunkName: "library-page" */ '../views/setting/playlistPage.vue'),
  },
  {
    path: '/impurities',
    name: 'Impurities',
    component: () => import(/* webpackChunkName: "library-page" */ '../views/setting/impuritiesPage.vue'),
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
