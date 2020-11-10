<template>
  <div id="app">
    <div class="action-bar">
      <Icon size="16" style="display:inline-block;color: rgba(253,191,65,1);margin-left: 10px;-webkit-app-region: no-drag" type="ios-remove-circle" @click="handleWindowMini" />
      <Icon size="16" style="display:inline-block;color: rgba(255,99,94,1);margin-left: 5px;-webkit-app-region: no-drag" type="ios-close-circle" @click="handleWindowClose" />
    </div>
    <div class="content-wrap">
      <Row>
        <Col span="4">
          <div class="side-wrap">
            <LeftSide />
          </div>
        </Col>
        <Col span="20">
          <Main />
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
  import LeftSide from './views/layouts/leftSide'
  import Main from './views/layouts/main'
  const ipcRenderer = require('electron').ipcRenderer
  import {mapActions} from 'vuex'
  export default {
    name: 'app',
    components: {
      LeftSide,
      Main,
    },
    methods: {
      handleWindowMini(){
        ipcRenderer.send('window-mini')
      },
      handleWindowClose(){
        ipcRenderer.send('window-close')
      },
      async getData(){
        const films = await this.$db.filmsLibrary.sort({created_at: -1}).find()
        const playlist = await this.$db.playlistLibrary.sort({created_at: -1}).find()
        const impurities = await this.$db.impuritiesLibrary.sort({created_at: -1}).find()
        const genres = await this.$db.genres.sort({created_at: -1}).find()
        const libraries = await this.$db.libraries.sort({created_at: -1}).find()
        const jp = await this.$db.JPTeleplayLibrary.sort({created_at: -1}).find()
        this.setFilms(films)
        this.setPlaylist(playlist)
        this.setImpurities(impurities)
        this.setGenres(genres)
        this.setLibraries(libraries)
        this.setJP(jp)
      },
      ...mapActions('BasicLibrary', [
          'setFilms',
          'setPlaylist',
          'setGenres',
          'setImpurities',
          'setLibraries',
          'setJP'
      ])
    },
    async created(){
      await this.getData()
    }
  }
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
}
.action-bar {
  height: 20px;
  width: 100vw;
  background-color: rgba(0,0,0,.1);
  -webkit-app-region: drag;
  -webkit-user-select: none;
}
.side-wrap {
  width: calc(100vw / 24 * 4);
}
</style>
