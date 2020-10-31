<template>
  <div class="film-wrap">
    <Table border stripe height="600" size="small" :columns="columns" :data="filmsData">
      <template slot-scope="{ row, index }" slot="status">
        <Tag color="green" v-if="row.status === '连载'">连载</Tag>
        <Tag color="red" v-else>完结</Tag>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" icon="ios-cloud-download-outline">下载</Button>
      </template>
    </Table>
  </div>
</template>
<script>
export default {
  name: 'Films',
  data(){
    return {
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
      filmsList: [],
    }
  },
  props: {
    filmsData: {
      type: Array,
      default: function(){
        return []
      }
    }
  },
}
</script>
<style lang="less" scoped>

</style>