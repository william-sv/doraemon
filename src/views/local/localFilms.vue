<template>
  <div class="playlist-wrap">
    <div class="nav-wrap">
      <Row :gutter="5">
        <Col span="2" v-for="category in categories" :key="category._id" class="category-item">
          <div style="width:100%;height:100%;cursor:pointer" @click="handleScreening(category)">{{ category.name }}</div>
        </Col>
      </Row>
    </div>
    <div class="playlist-item">
      <Row>
        <Scroll :on-reach-bottom="handleLoadingFiles" height="600">
          <Col span="4" v-for="film in filmsList" :key="film._id">
            <div class="film-item" @click="handlePlayFilm(film.absolutePath)">
              <div class="film-poster-item" :style="{ backgroundImage: film.poster != '' ? 'url(' + film.poster + ') ' : 'url(' + require('../../assets/no_poster.png') + ')' }">
                <img :src="require('../../assets/play.png')" class="film-play-btn">
              </div>
              <div class="film-name">
                {{ film.name.slice(0,15) }}
              </div>
            </div>
          </Col>
        </Scroll>
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

export default {
  name: 'LocalPlaylist',
  data(){
    return {
      showFilmPlayArea: false,
      categories: [

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
      filmsList: [
        {
          name: '女子美食汉堡部.EP02',
          absolutePath: 'aaa',
          poster: require('../../assets/p2614949805.jpg'),
        },
        {
          name: '女子美食汉堡部.EP02',
          absolutePath: 'aaa',
          poster: '',
        },
        {
          name: '女子美食汉堡部.EP02',
          absolutePath: 'aaa',
          poster: '',
        },
        {
          name: '女子美食汉堡部.EP02',
          absolutePath: 'aaa',
          poster: '',
        },
        {
          name: '女子美食汉堡部.EP02',
          absolutePath: 'aaa',
          poster: '',
        },
        {
          name: '女子美食汉堡部.EP02',
          absolutePath: 'aaa',
          poster: '',
        },
        {
          name: '女子美食汉堡部.EP02',
          absolutePath: 'aaa',
          poster: '',
        },
        {
          name: '女子美食汉堡部.EP02',
          absolutePath: 'aaa',
          poster: '',
        },
        {
          name: '女子美食汉堡部.EP02',
          absolutePath: 'aaa',
          poster: '',
        },
        {
          name: '女子美食汉堡部.EP02',
          absolutePath: 'aaa',
          poster: '',
        },
        {
          name: '女子美食汉堡部.EP02',
          absolutePath: 'aaa',
          poster: '',
        },
        {
          name: '女子美食汉堡部.EP02',
          absolutePath: 'aaa',
          poster: '',
        },
        {
          name: '女子美食汉堡部.EP02',
          absolutePath: 'aaa',
          poster: '',
        },
        {
          name: '女子美食汉堡部.EP02',
          absolutePath: 'aaa',
          poster: '',
        },
        {
          name: '女子美食汉堡部.EP02',
          absolutePath: 'aaa',
          poster: '',
        },
        {
          name: '女子美食汉堡部.EP02',
          absolutePath: 'aaa',
          poster: '',
        },
        {
          name: '女子美食汉堡部.EP02',
          absolutePath: 'aaa',
          poster: '',
        },
        {
          name: '女子美食汉堡部.EP02',
          absolutePath: 'aaa',
          poster: '',
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
    handleLoadingFiles(){},
    handlePlayFilm(filmPath){
      filmPath = '/Users/will/movie/出师表第01-02集_2.mp4'
      this.showFilmPlayArea = true
      if(filmPath != ''){
        this.$refs.playFilm.handleStartPlay({filmPath: filmPath})
      }
    },
    handleStopPlay(){
      this.$refs.playFilm.handleDestoryPlay()
      this.showFilmPlayArea = false
    },
    fetchCategories(){
      const that = this
      return new Promise(function(resolve, reject){
        that.$db.categories.find({},(error,docs)=>{
          if(error){
            reject(error)
          }
          resolve()
          that.categories = docs
        })
      })
    },
    initCategory(){ // 初始化分类数据
      const that = this
      return new Promise(function(resolve, reject){
        const categories = [
          '科幻','喜剧','动作','奇幻','冒险','武侠','爱情','悬疑','惊悚','恐怖','犯罪','音乐','歌舞','传记','历史','战争','西部','灾难','动画'
        ]
        categories.forEach((item, index) => {
          that.$db.categories.insert({name: item, sort: index}, (error,doc) => {
            if(error){reject(error)}
            resolve()
          })
        })
      })
    },
  },
  async created(){
    // 读取分类数据
    // await this.fetchCategories()
    // 如果分类数据为空，则初始化分类数据，再重新读取
    // if(this.categories.length === 0){
    //   await this.initCategory()
    //   await this.fetchCategories()
    // }
  },
}
</script>
<style lang="less" scoped>
  .nav-wrap {
    margin-bottom: 20px;
  }
  .category-item {
    display: block;
    margin: 5px 0;
    text-align: center;
  }
  // .playlist-item {
  //   margin-top: 20px;
  // }
  .film-item {
    margin-bottom: 20px;
    cursor:pointer;
  }
  .film-poster-item {
    width: 100px;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .film-poster, .film-play-btn {
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
    width: 700px;
    height: 400px;
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
    right: 10px;
    transform: translate(-10px, -10px);
    margin-top: 20px;
    z-index: 1001;
  }
</style>