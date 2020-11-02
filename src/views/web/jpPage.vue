<template>
  <div class="web-files-wrap">
    <h3 style="text-align: center;margin-bottom: 10px;">追新番日剧</h3>
    <div class="web-tips">
      <Alert>日剧资源主要来自 追新番 （http://www.zhuixinfan.com/main.php）</Alert>
    </div>
    <div class="file-wrap">
      <Files ref="jpFiles" :filesData="filesData" />
    </div>
  </div>
</template>
<script>
import Files from './components/JPFiles'

export default {
  name: 'JP',
  data(){
    return {
      filesData: [],
    }
  },
  components: {
    Files
  },
  methods: {
    async getFilmsData(){
      this.$http.get('http://localhost:1221/web?source=zhuixinfan').then(async (response) => {
        const result = response.data.data
        if(result.length === 0){
          this.$Message.error('爬虫发生了一些错误，未能成功拉取数据，请稍后重试~')
          return
        }
        this.filesData = result.reverse()
        await this.saveJPTeleplayLibrary(result)
      })
    },
    async getJPTeleplayLibrary(){
      return await this.$db.JPTeleplayLibrary.sort({created_at:-1}).find({})
    },
    async saveJPTeleplayLibrary(data){
      if(data.length === 0){
        return
      }
      for (const item of data) {
        let result = await this.findOneJP(item.name,item.pid)
        if(!result){
          await this.$db.JPTeleplayLibrary.insert(item)
        }
      }
    },
    async findOneJP(name,pid){
      return await this.$db.JPTeleplayLibrary.findOne({name: name, pid: pid})
    },
  },
  async created() {
    this.filesData = await this.getJPTeleplayLibrary()

  },
  async mounted(){
    if(this.filesData.length === 0){
      await this.getFilmsData()
    }
  }
}
</script>
<style lang="less" scoped>
  .web-files-wrap{
    position: relative;
  }
</style>