<template>
  <div class="impurities-wrap">
    <h3 style="text-align: center;margin-bottom: 10px;">文件名杂质词</h3>
    <div style="display: flex;justify-content: flex-end;margin-bottom: 10px;">
      <Button  type="success" size="small" icon="md-add">新增</Button>
    </div>
    <div class="impurities-items" v-if="impurities && impurities.length > 0">
      <Tag closable @on-close="handleClose(item._id)" v-for="item in impurities" :key="item._id" style="margin: 0 10px 10px 0;">{{ item.impurity }}</Tag>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Impurities",
    data(){
      return {
        impurities: [],
      }
    },
    methods: {
      handleClose(id){
        console.log(id)
      },
    },
  }
</script>

<style scoped>

</style>