const state = {
  menus: [],
  ffmpegPath: '',
  aria2Path: '',
}
const mutations = {
  SET_MENUS: (state,menus) => {
    state.menus = menu
  },
  SET_FFMPEGPATH: (state, ffmpegPath) => {
    state.ffmpegPath = ffmpegPath
  },
  SET_ARIA2PATH: (state, aria2Path) => {
    state.aria2Path = aria2Path
  }
}
const actions = {
  setMenus({commit,state}, menus){
    commit('SET_MENUS',menus)
  },
  setFfmpegPath({commit,state}, ffmpegPath){
    commit('SET_FFMPEGPATH',ffmpegPath)
  },
  setAria2Path({commit,state}, aria2Path){
    commit('SET_ARIA2PATH',aria2Path)
  },
}
const getters = {
  menus: (state) => {
    return state.menus
  },
  ffmpegPath: (state) => {
    return state.ffmpegPath
  },
  aria2Path: (state) => {
    return state.aria2Path
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}