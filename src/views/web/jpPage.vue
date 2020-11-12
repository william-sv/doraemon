<template>
  <div class="web-files-wrap">
    <h3 style="text-align: center;margin-bottom: 10px;">追新番日剧</h3>
    <div style="display: flex;justify-content: flex-end;margin-bottom: 10px;">
      <Button type="success" size="small" icon="md-refresh" @click="refreshData">刷新</Button>
    </div>
    <div class="web-tips">
      <Alert>日剧资源主要来自 追新番 （http://www.zhuixinfan.com/main.php）</Alert>
    </div>
    <div class="file-wrap">
      <Table :loading="loading" border stripe height="650" size="small" :columns="columns" :data="filesData">
        <template slot-scope="{ row, index }" slot="status">
          <Tag color="green" v-if="row.status === '连载'">连载</Tag>
          <Tag color="red" v-else>完结</Tag>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" icon="ios-cloud-download-outline">下载</Button>
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'JPFilms',
  data(){
    return {
      filesData: [],
      loading: false,
      columns: [
        {
          title: '剧名',
          key: 'name',
        },
        {
          title: '类型',
          key: 'genre',
          width: '120'
        },
        {
          title: '集数',
          key: 'episode',
          width: '80'
        },
        {
          title: '状态',
          slot: 'status',
          width: '90',
        },
        {
          title: '操作',
          slot: 'action',
          width: '100',
        }
      ],
    }
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
    async refreshData(){
      this.loading = true
      await this.getFilmsData()
      this.loading = false
    },
  },
  created() {
    const st = (new Date()).getTime()
    console.log(st)
    this.filesData = this.jp
    const et = (new Date()).getTime()
    console.log(et)
    console.log(et - st)
  },
  computed: {
    ...mapGetters('BasicLibrary',[
      'jp',
    ])
  },
}
</script>
<style lang="less" scoped>
  .web-files-wrap{
    position: relative;
  }
</style>