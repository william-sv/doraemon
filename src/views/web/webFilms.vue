<template>
  <div class="web-films-wrap">
    <div class="web-nav">
      <Tabs v-model="activeTab" @on-click="changeTab">
        <TabPane label="追新番" name="zhuixinfan">
        </TabPane>
        <TabPane label="比特大雄吧" name="btdx8"></TabPane>
        <TabPane label="美剧天堂" name="mjtt"></TabPane>
      </Tabs>
      <div class="film-wrap">
        <Films :filmsData="filmsData" v-if="filmsData && filmsData.length > 0" />
      </div>
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>
<script>
import Films from './components/Films'
export default {
  name: 'WebFilms',
  data(){
    return {
      activeTab: 'zhuixinfan',
      filmsData: [],
      spinShow: false,
      zxfCrawlerInit: true,
    }
  },
  components: {
    Films
  },
  methods: {
    getFilmsData(){
      this.$http.get('http://localhost:1221/web?source=' + 'zhuixinfan').then((response) => {
        this.filmsData = response.data.data
        this.spinShow = false
      })
    },
    changeTab(name){
      this.spinShow = true
      // this.getFilmsData()
    }
  },

}
</script>
<style lang="less" scoped>
  .film-wrap {
    height: 640px;
    overflow: hidden;
    overflow-y: scroll;
  }
</style>