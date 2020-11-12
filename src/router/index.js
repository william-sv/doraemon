import Vue from 'vue'
import VueRouter from 'vue-router'
import LocalFilms from '../views/local/localPage.vue'
import JPFilms from '../views/web/jpPage.vue'
import Library from '../views/setting/libraryPage.vue'
import Playlist from '../views/setting/playlistPage.vue'
import Impurities from '../views/setting/impuritiesPage.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/local',
    name: 'LocalFilms',
    component: LocalFilms
  },
  {
    path: '/web/jp',
    name: 'JPFilms',
    component: JPFilms
  },
  {
    path: '/library',
    name: 'Library',
    component: Library
  },
  {
    path: '/playlist',
    name: 'Playlist',
    component: Playlist
  },
  {
    path: '/impurities',
    name: 'Impurities',
    component: Impurities
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
]

const router = new VueRouter({
  routes
})

export default router
