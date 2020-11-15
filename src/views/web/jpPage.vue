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
      <Table :loading="loading" border stripe height="650" size="small" :columns="columns" :data="jp">
        <template slot-scope="{ row, index }" slot="status">
          <Tag color="green" v-if="row.status === '连载'">连载</Tag>
          <Tag color="red" v-else>完结</Tag>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="success" size="small" icon="ios-cloud-download" shape="circle"></Button>
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
import FilmTable from "@/views/web/components/FilmTable"
import { mapGetters,mapActions } from 'vuex'
export default {
  name: 'JPFilms',
  data(){
    return {
      // filesData: [],
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
          align: 'center',
          width: '70'
        },
        {
          title: '状态',
          slot: 'status',
          align: 'center',
          width: '90',
        },
        {
          title: '下载',
          slot: 'action',
          align: 'center',
          width: '80',
        }
      ],
      loading: false,
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
        await this.saveJPTeleplayLibrary(result) // 存储数据
        // 更新vuex
        const jp = await this.$db.JPTeleplayLibrary.sort({created_at: -1}).find()
        this.setJP(jp)
        this.filesData = this.jp

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
        } else {
          // await this.$db.JPTeleplayLibrary.update()
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
    ...mapActions('BasicLibrary', [
      'setJP'
    ])
  },
  components: {
    FilmTable,
  },
  mounted() {
    // this.filesData = this.jp
  },
  computed: {
    ...mapGetters('BasicLibrary',[
      'jp',
    ])
  },
}
</script>
<style lang="less" scoped>

</style>