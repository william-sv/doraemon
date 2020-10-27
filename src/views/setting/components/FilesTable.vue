<template>
  <div class="files-table-wrap">
    <div class="files-table-item">
      <Table border :columns="columns" size="small" :data="filesData.slice(0,10)">
        <template slot-scope="{ row,index }" slot="name">
          <span class="file-name">{{ row.name }}</span>
        </template>
        <template slot-scope="{ row,index }" slot="dirPath">
          <span class="file-dirPath">{{ row.dirPath }}</span>
        </template>
      </Table>
    </div>
    <div class="page-item" v-show="filesData.length > 15">
      <Page :total="pageTotal"  size="small" :current.sync="currentPageNum" @on-change="changePage"></Page>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FilesTable",
    data(){
      return {
        columns: [
          {
            title: '文件名',
            slot: 'name',
            width: 300,
          },
          {
            title: '所在文件夹',
            slot: 'dirPath'
          },
          {
            title: '格式',
            key: 'fileFormat',
            width: 70,
            align: 'center'
          },
          {
            title: '尺寸',
            key: 'fileW_H',
            width: 100,
            align: 'center'
          },
          {
            title: '大小',
            key: 'fileSize',
            width: 100,
            align: 'center'
          }
        ],
        filesData:[],
        pageTotal: 10,
        currentPageNum: 1,
      }
    },
    methods: {
      changePage(){},
    },
  }
</script>

<style scoped>
  .files-table-wrap {
    height: 500px;
  }
  .files-table-item {
    height: 450px;
  }
  .file-name {
    display: inline-block;
    width: 260px;
    white-space: nowrap;
    overflow: hidden;

  }
  .file-name:hover {
    display: inline-block;
    width: 260px;
    color: red;
    white-space: nowrap;
    overflow: visible;
    animation: wordsLoop 10s linear infinite normal
  }
  .file-dirPath {
    display: inline-block;
    width: 350px;
    white-space: nowrap;
    overflow: hidden;

  }
  .file-dirPath:hover {
    display: inline-block;
    width: 350px;
    color: red;
    white-space: nowrap;
    overflow: visible;
    animation: wordsLoop 10s linear infinite normal
  }
  @keyframes wordsLoop {
    0% {
      transform: translateX(0px);
      -webkit-transform: translateX(0px);
    }
    100% {
      transform: translateX(-100%);
      -webkit-transform: translateX(-100%);
    }
  }
  .page-item {
    text-align: center;
  }
</style>