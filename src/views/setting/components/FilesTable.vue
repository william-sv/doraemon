<template>
  <div class="files-table-wrap">
    <div class="files-table-item">
      <Table border :columns="columns" size="small" :data="filesList">
        <template slot-scope="{ row,index }" slot="name">
          <span class="file-name">{{ row.name }}</span>
        </template>
        <template slot-scope="{ row,index }" slot="dirPath">
          <span class="file-dirPath">{{ row.dirPath }}</span>
        </template>
      </Table>
    </div>
    <div class="page-item" v-show="filesData.length > 10">
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
            title: '大小',
            key: 'fileSize',
            width: 100,
            align: 'center'
          }
        ],
        filesList:[],
        pageTotal: 0,
        currentPageNum: 1,
      }
    },
    props:{
      filesData: {
        type: Array,
        default: function(){
          return []
        }
      }
    },
    methods: {
      changePage(){
        this.filesList = this.filesData.slice((this.currentPageNum - 1) * 10, this.currentPageNum * 10)
      },
      restPageSetting(){
        this.pageTotal = 0
        this.currentPageNum = 1
      },
    },
    watch: {
      filesData: function(){
        this.pageTotal = this.filesData.length
        this.filesList = this.filesData.slice(0,10)
      }
    }
  }
</script>

<style scoped>
  .files-table-wrap {
    height: 550px;
  }
  .files-table-item {
    height: 500px;
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