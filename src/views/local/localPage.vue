<template>
  <div class="playlist-wrap">
    <div class="nav-wrap">
      <Row :gutter="5">
        <Col :sm="2" :xl="1" v-for="genre in genres" :key="genre._id" class="genre-item">
          <div style="width:100%;height:100%;cursor:pointer" @click="handleScreening(genre)">{{ genre.name }}</div>
        </Col>
      </Row>
    </div>
    <div>
      <Row class="playlist-item">
        <Col :span="4" v-for="film in playlist">
          <div class="film-item" @click="handlePlayFilm(film.file_id)">
            <div class="film-poster-item" :style="{ backgroundImage: (film.poster && film.poster !== '') ? 'url(' + film.poster + ') ' : 'url(' + require('../../assets/no_poster.png') + ')' }">
              <img :src="require('../../assets/play.png')" class="film-play-btn">
            </div>
            <div class="film-name">
              {{ film.name.slice(0,15) }}
            </div>
          </div>
        </Col>
      </Row>
    </div>
    <div class="play-item" v-show="showFilmPlayArea">
      <Button class="close-btn" size="small" shape="circle" icon="md-close" @click="handleStopPlay"></Button>
      <PlayFilm ref="playFilm" />
    </div>
  </div>
</template>
<script>
import PlayFilm from '../../components/PlayFilm'
import { mapGetters } from 'vuex'
export default {
  name: 'LocalPlaylist',
  data(){
    return {
      showFilmPlayArea: false,
      genres: [

        {
          id: 1,
          name: '喜剧'
        },
        {
          id: 2,
          name: '动作'
        },
        {
          id: 3,
          name: '爱情'
        },
        {
          id: 4,
          name: '科幻'
        },
        {
          id: 5,
          name: '动画'
        },
        {
          id: 6,
          name: '悬疑'
        },
        {
          id: 7,
          name: '惊悚'
        },
        {
          id: 8,
          name: '恐怖'
        },
        {
          id: 9,
          name: '犯罪'
        },
        {
          id: 10,
          name: '音乐'
        },
        {
          id: 11,
          name: '歌舞'
        },
        {
          id: 12,
          name: '传记'
        },
        {
          id: 13,
          name: '历史'
        },
        {
          id: 14,
          name: '战争'
        },
        {
          id: 15,
          name: '西部'
        },
        {
          id: 16,
          name: '奇幻'
        },
        {
          id: 17,
          name: '冒险'
        },
        {
          id: 18,
          name: '灾难'
        },
        {
          id: 19,
          name: '武侠'
        },
      ],
    }
  },
  components: {
    PlayFilm
  },
  methods: {
    handleScreening(item){
      console.log(item.name)
    },
    async handlePlayFilm(id){
      let filmPath = await this.getFilmPath(id)
      this.showFilmPlayArea = true
      if(filmPath !== ''){
        this.$refs.playFilm.handleStartPlay({filmPath: filmPath})
      }
    },
    handleStopPlay(){
      this.$refs.playFilm.handleDestoryPlay()
      this.showFilmPlayArea = false
    },
    fetchGenres(){
      const that = this
      return new Promise(function(resolve, reject){
        that.$db.genres.find({},(error,docs)=>{
          if(error){
            reject(error)
          }
          resolve()
          that.genres = docs
        })
      })
    },
    initGenre(){ // 初始化分类数据
      const that = this
      return new Promise(function(resolve, reject){
        const genres = [
          '科幻','喜剧','动作','奇幻','冒险','武侠','爱情','悬疑','惊悚','恐怖','犯罪','音乐','歌舞','传记','历史','战争','西部','灾难','动画'
        ]
        genres.forEach((item, index) => {
          that.$db.genres.insert({name: item, sort: index}, (error,doc) => {
            if(error){reject(error)}
            resolve()
          })
        })
      })
    },
    async getPlaylistData(offset,limit){
      return await this.$db.playlistLibrary.sort({created_at: -1}).limit(offset,limit).find()
    },
    async getFilmPath(id){
      let filmPath = ''
      const result = await this.$db.filmsLibrary.findOne({_id: id})
      console.log(result)
      if(result.hasOwnProperty('absolutePath')){
        filmPath = result.absolutePath
      }
      console.log(filmPath)
      return filmPath
    },
  },
  computed: {
    ...mapGetters('BasicLibrary',[
      'playlist',
    ])
  },
}
</script>
<style lang="less" scoped>
  .nav-wrap {
    margin-bottom: 20px;
  }
  .genre-item {
    display: block;
    margin: 5px 0;
    text-align: center;
  }
  .mask-wrap {
    width: 100vw;
    height: 100vh;
    background-color: rgba(255,255,255,1);
  }
   .playlist-item {
     //margin-top: 20px;
     height: 650px;
     overflow-y: scroll;
   }
  .film-item {
    margin-bottom: 20px;
    cursor:pointer;
  }
  .film-poster-item {
    width: 100px;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .film-play-btn {
    width: 100%;
    height: 100%;
  }
  .film-name {
    width: 100px;
    font-size: 12px;
  }
  .play-item {
    display: block;
    position: fixed;
    //width: 700px;
    //height: 400px;
    width: 100vw;
    height: 100vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    background-color: rgba(0,0,0,0.4);
    box-shadow: 0 0 10px rgba(0,0,0,0.4);
    z-index: 1000;
  }
  .close-btn {
    position: fixed;
    right: 19%;
    transform: translate(-50%, -50%);
    margin-top: 27%;
    z-index: 1001;
  }
</style>