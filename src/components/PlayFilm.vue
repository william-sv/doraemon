<template>
  <div class="play-wrap">
    <div id="film-play-area"></div>
  </div>
</template>
<script>
import Player from 'xgplayer'
import HlsPlayer from 'xgplayer-hls'

export default {
  name: '',
  data() {
    return {
      playResource: {},
    }
  },
  methods: {
    handleStartPlay(data){
      let filmPath
      if(data.hasOwnProperty('filmPath') && data.filmPath != ''){
        filmPath = data.filmPath
        const resourceUrl = 'http://localhost:1221/video/url?video=' + encodeURIComponent(filmPath)
        let player = new Player({
          id: 'film-play-area',
          url: resourceUrl, //resourceUrl
          width: 640,
          height: 360,
          fitVideoSize: 'auto'
        })
        // this.playResource = Object.assign({}, player)
        this.playResource = player
      }
    },
    handleDestoryPlay(){
      if(Object.keys(this.playResource).length > 0){
        this.playResource.destroy()
      }
      this.playResource = {}
    }
  },
}
</script>
<style lang="less" scoped>
  .play-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .1);
  }


</style>