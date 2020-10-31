<template>
  <div class="playlist-wrap">
    <h3 style="text-align: center;margin-bottom: 10px;">播放列表</h3>
    <div class="playlist-btn">
      <Button type="primary" icon="md-albums" size="small">生成合集</Button>
      <Button type="success" icon="md-refresh" size="small" style="margin-left: 10px;">更新播放列表</Button>
    </div>
    <Table border ref="playlist" height="600" :columns="columns" size="small" :data="playlist" @on-select="handleSelection">

    </Table>
  </div>
</template>

<script>
  export default {
    name: "Playlist",
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
            title: '来源',
            key: 'library'
          },
        ],
        playlist: [
          {
            name: '女子美食汉堡部',
            duration: '23:54',
            absolutePath: ['/Users/will/movie/女子美食汉堡部.EP02.中日双语.1280X720.HDTVrip-幻月字幕组.mp4']
          },
          {
            name: '女子美食汉堡部',
            duration: '23:54',
            absolutePath: ['/Users/will/movie/女子美食汉堡部.EP02.中日双语.1280X720.HDTVrip-幻月字幕组.mp4']
          },
          {
            name: '女子美食汉堡部',
            duration: '23:54',
            absolutePath: ['/Users/will/movie/女子美食汉堡部.EP02.中日双语.1280X720.HDTVrip-幻月字幕组.mp4']
          },
          {
            name: '女子美食汉堡部',
            duration: '23:54',
            absolutePath: ['/Users/will/movie/女子美食汉堡部.EP02.中日双语.1280X720.HDTVrip-幻月字幕组.mp4']
          },
          {
            name: '女子美食汉堡部',
            duration: '23:54',
            absolutePath: ['/Users/will/movie/女子美食汉堡部.EP02.中日双语.1280X720.HDTVrip-幻月字幕组.mp4']
          },
        ],
      }
    },
    methods: {
      handleSelection(selection){
        console.log(selection)
      },
    },
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