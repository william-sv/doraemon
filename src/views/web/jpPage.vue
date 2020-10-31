<template>
  <div class="web-films-wrap">
    <h3 style="text-align: center;margin-bottom: 10px;">追新番日剧</h3>
    <div class="web-tips">
      <Alert>日剧资源主要来自 追新番 （http://www.zhuixinfan.com/main.php）</Alert>
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
</template>
<script>
import Films from './components/Films'

export default {
  name: 'JP',
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
    async getFilmsData(){
      this.$http.get('http://localhost:1221/web?source=zhuixinfan').then(async (response) => {
        const result = response.data.data
        if(result.length === 0){
          this.$Message.error('爬虫发生了一些错误，未能成功拉取数据，请稍后重试~')
          return
        }
        this.filmsData = result
        await this.saveJPTeleplayLibrary(result)
        this.zxfCrawlerInitInExecution = false
      })
    },
    async initZXF(){
      this.$Message.success({
        background: true,
        content: '初始化任务已开始执行，任务大概需要执行3-5分钟左右~'
      })
      this.zxfCrawlerInit = false
      this.zxfCrawlerInitInExecution = true
      await this.getFilmsData()

    },
    async getJPTeleplayLibrary(){
      this.filmsData = await this.$db.JPTeleplayLibrary.sort({created_at:-1}).find({})
    },
    async saveJPTeleplayLibrary(data){
      await this.$db.JPTeleplayLibrary.insert(data)
    },
  },
  async mounted() {
    await this.getJPTeleplayLibrary()
    console.log(this.filmsData)
    if(this.filmsData.length !== 0){
      this.zxfCrawlerInit = false
      this.zxfCrawlerInitInExecution = false
    }
  }
}
</script>
<style lang="less" scoped>

</style>