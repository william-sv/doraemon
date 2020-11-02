<template>
  <div class="impurities-wrap">
    <h3 style="text-align: center;margin-bottom: 10px;">文件名杂质词</h3>
    <Alert show-icon>杂质词主要用于在生成播放列表时对文件标题进行过滤，删除一些杂质词。该操作不会对您的文件产生任何影响~</Alert>
    <div style="display: flex;justify-content: flex-end;margin-bottom: 10px;">
      <Button  type="success" size="small" icon="md-add" @click="handleAddNewImpurity">新增</Button>
    </div>
    <div class="impurities-items" v-if="impuritiesData && impuritiesData.length > 0">
      <Tag closable @on-close="handleDel(index,item._id,item.impurity)" v-for="(item,index) in impuritiesData" :key="item._id" style="margin: 0 10px 10px 0;">{{ item.impurity }}</Tag>
    </div>
    <Modal v-model="newImpurityModal" width="300" @on-cancel="handleCancel">
      <p slot="header" style="text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>新增杂质词</span>
      </p>
      <div style="text-align:center">
        <Input v-model="newImpurity" placeholder="请输入杂质词" />
      </div>
      <div slot="footer">
        <Button type="success" size="large" @click="handleSubmit" long>新增</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "Impurities",
    data(){
      return {
        impuritiesData: [],
        newImpurity: '',
        newImpurityModal: false
      }
    },
    methods: {
      handleDel(index,id,impurity){
        this.$Modal.confirm({
          title: '删除杂质词',
          content: '是否确认删除杂质词 ' + impurity,
          okText: '删除',
          cancelText: '取消',
          onOk: async () => {
            await this.deleteImpurity(id)
            this.$Message.success(impurity + '已删除~')
            this.impuritiesData.splice(index,1)
          },
          onCancel: () => {
            this.$Message.info('已取消该操作~')
          }
        })
      },
      async saveImpurity(impurity){
        return await this.$db.impuritiesLibrary.insert({impurity: impurity, created_at: (new Date()).getTime()})
      },
      deleteImpurity(id){
        this.$db.impuritiesLibrary.remove({_id: id})
      },
      handleAddNewImpurity(){
        this.newImpurityModal = true
      },
      async handleSubmit(){
        if(this.newImpurity === ''){
          this.$Message.error('新增的杂质词不能为空~请检查后重试')
          return
        }

        const result = await this.saveImpurity(this.newImpurity)
        this.$Message.success( '新的杂质词 ' + this.newImpurity + ' 已添加~')
        this.newImpurityModal = false
        this.newImpurity = ''
        this.impuritiesData.push(result)
      },
      handleCancel(){
        this.newImpurity = ''
      },
      async getImpurities(){
        this.impuritiesData = await this.$db.impuritiesLibrary.sort({created_at:-1}).find()
      }
    },
    async created() {
      await this.getImpurities()
    }
  }
</script>

<style scoped>

</style>