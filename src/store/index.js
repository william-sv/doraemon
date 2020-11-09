import Vue from 'vue'
import Vuex from 'vuex'
import BasicLibrary from './modules/basicLibrary'
import Setting from './modules/setting'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    BasicLibrary,
    Setting,
  }
})
