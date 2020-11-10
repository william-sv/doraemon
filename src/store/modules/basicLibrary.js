const state = {
  playlist: [],
  genres: [],
  impurities: [],
  libraries: [],
  films: [],
  jp: [],
}
const mutations = {
  SET_PLAYLIST: (state,playlist) => {
    state.playlist = playlist
  },
  SET_GENRES: (state, genres) => {
    state.genres = genres
  },
  SET_IMPURITIES: (state, impurities) => {
    state.impurities = impurities
  },
  SET_LIBRARIES: (state, libraries) => {
    state.libraries = libraries
  },
  SET_FILMS: (state,films) => {
    state.films = films
  },
  SET_JP: (state,jp) => {
    state.jp = jp
  },
}
const actions = {
  setPlaylist({commit,state},playlist){
    commit('SET_PLAYLIST',playlist)
  },
  setGenres({commit,state},genres){
    commit('SET_GENRES', genres)
  },
  setImpurities({commit,state},impurities){
    commit('SET_IMPURITIES',impurities)
  },
  setLibraries({commit,state},libraries){
    commit('SET_LIBRARIES',libraries)
  },
  setFilms({commit,state},films){
    commit('SET_FILMS',films)
  },
  setJP({commit,state},jp){
    commit('SET_JP',jp)
  },
}
const getters = {
  playlist: (state) => {
    return state.playlist
  },
  genres: (state) => {
    return state.genres
  },
  impurities: (state) => {
    return state.impurities
  },
  libraries: (state) => {
    return state.libraries
  },
  films: (state) => {
    return state.films
  },
  jp: (state) => {
    return state.jp
  },

}


export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}