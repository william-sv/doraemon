<template>
  <div class="playlist-wrap">
    <h3 style="text-align: center;margin-bottom: 10px;">播放列表</h3>
    <div class="playlist-btn">
      <Button type="primary" icon="md-albums" size="small">生成合集</Button>
      <Button type="success" icon="md-refresh" size="small" style="margin-left: 10px;">更新播放列表</Button>
    </div>
    <Table ref="playlist" height="600" :columns="columns" size="small" :data="playlistData" @on-select="handleSelection">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="error" size="small" icon="ios-trash" @click="handleDel(index,row._id)" shape="circle"></Button>
      </template>
    </Table>
  </div>
</template>

<script>
  export default {
    name: "PlaylistPage",
    data(){
      return {
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '名字',
            key: 'name',
          },
          {
            title: '操作',
            slot: 'action',
            width: 120,
            align: 'center'
          },
        ],
        playlistData: [],
      }
    },
    methods: {
      handleSelection(selection){
        console.log(selection)
      },
      async fetchPlaylistData(){
        return await this.$db.playlistLibrary.sort({created_at: -1}).find()
      },
      async handleDel(){},
    },
    async created(){
      this.playlistData = await this.fetchPlaylistData()
      console.log(this.playlistData)
    }
  }
</script>

<style scoped>
  .playlist-title {
    text-align: center;
    font-size: 14px;
    font-weight: bold;
  }
  .playlist-btn {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
  }

</style>