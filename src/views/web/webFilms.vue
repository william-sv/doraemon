<template>
  <div class="web-films-wrap">
    <div class="web-nav">
      <div class="web-tips">
        <Alert>日剧主要采集自 追新番 （http://www.zhuixinfan.com/main.php）</Alert>
      </div>
      <div class="zxf-init" v-if="zxfCrawlerInit">
        <Alert show-icon>
          使用前准备
          <template slot="desc">
            当前数据尚未初始化，是否初始化？
          <Button type="success" size="small" @click="initZXF">初始化</Button>
          </template>
        </Alert>
      </div>
      <div class="zxf-init" v-if="zxfCrawlerInitInExecution">
        <Alert show-icon>
          使用前准备
          <template slot="desc">
            当前数据正在初始化，初始化过程大概需要3-5分钟左右~
          </template>
        </Alert>
      </div>
      <div class="film-wrap">
        <Films :filmsData="filmsData" v-if="filmsData && filmsData.length > 0" />
      </div>
    </div>
  </div>
</template>
<script>
import Films from './components/Films'

export default {
  name: 'WebFilms',
  data(){
    return {
      filmsData: [],
      zxfCrawlerInit: true,
      zxfCrawlerInitInExecution: false
    }
  },
  components: {
    Films
  },
  methods: {
    getFilmsData(){
      this.$http.get('http://localhost:1221/web?source=zhuixinfan').then((response) => {
        this.filmsData = response.data.data
        this.zxfCrawlerInitInExecution = false
      })
    },
    initZXF(){
      this.$Message.success({
        background: true,
        content: '初始化任务已开始执行，任务大概需要执行3-5分钟左右~'
      })
      this.zxfCrawlerInit = false
      this.zxfCrawlerInitInExecution = true
      this.getFilmsData()


    },
  },

}
</script>
<style lang="less" scoped>
  //.film-wrap {
  //  height: 640px;
  //  overflow: hidden;
  //  overflow-y: scroll;
  //}
</style>