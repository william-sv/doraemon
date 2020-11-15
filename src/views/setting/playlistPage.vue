<template>
  <div class="playlist-wrap">
    <h3 style="text-align: center;margin-bottom: 10px;">播放列表</h3>
    <div class="playlist-btn">
      <Input v-model="searchValue" search enter-button size="small" placeholder="检索" style="width:250px" @on-search="handleSearch" @on-change="changeSearchValue" />
      <Button type="primary" icon="md-albums" size="small" style="margin-left: 10px;" @click="handleCreateGroup">生成合集</Button>
<!--      <Button type="success" icon="md-refresh" size="small" style="margin-left: 10px;">更新播放列表</Button>-->
    </div>
    <Table border ref="playlist" height="700" :columns="columns" size="small" :data="playlistData" @on-select="handleSelection" @on-select-all="handleSelection">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="success" size="small" icon="md-swap" @click="handleTransformFormat(index,row._id)" shape="circle"></Button>
        <Button style="margin-left: 5px;" type="error" size="small" icon="ios-trash" @click="handleDel(index,row._id)" shape="circle"></Button>
      </template>
    </Table>
    <Modal v-model="openCreateGroupModal" width="460">
      <p slot="header" style="text-align:center">
        <span>生成合集</span>
      </p>
      <div>
        合集名称：<Input clas="group-name" v-model="groupName" style="display: inline-block;width: 350px;" placeholder="请输入合集名称" />
        <div style="margin-top: 10px;">
          合集内容：<span style="display: inline-block;font-size: 12px;">包含 {{ selectionValue.length }} 个内容</span>
          <div @drop="drop($event)" @dragover="allowDrop($event)" style="height: 150px;background-color: #f8f8f9;">
            <span class="group-item" :id="'span' + index" v-for="(item,index)  in selectionValue" @dragstart="drag($event)" draggable="true">{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div slot="footer">
        <Button type="success" size="large" long @click="createGroup">生成</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "Playlist",
    data(){
      return {
        openCreateGroupModal: false,
        searchValue: '',
        groupName: '',
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
            title: '格式',
            key: 'fileFormat',
            width: 120,
          },
          {
            title: '操作',
            slot: 'action',
            width: 120,
            align: 'center'
          },
        ],
        playlistData: [],
        selectionValue: []
      }
    },
    methods: {
      handleSelection(selection){
        this.selectionValue = selection
      },
      async fetchPlaylistData(){
        return await this.$db.playlistLibrary.sort({created_at: -1}).find()
      },
      async handleDel(){},
      handleCreateGroup(){
        if(this.selectionValue.length <= 1){
          this.$Message.error('必须选择两个或两个以上的视频才能生成合集~,请检查后重试~')
        } else {
          this.groupName = this.selectionValue[0].name
          this.openCreateGroupModal = true
        }
      },
      async createGroup(){
        let group = []
        const selected = this.selectionValue
        for (const item of selected) {
          group.push({
            name: item.name,
            oldName: item.oldName,
            fileFormat: item.fileFormat,
            library_id: item.library_id,
            file_id: item._id
          })
        }
        console.log(group)
        // await this.$db.playlistLibrary.insert({
        //   name: this.groupName,
        //   oldName: this.groupName,
        //   fileFormat: '',
        //   library_id: '',
        //   created_at: '',
        //   file_id: '',
        //   status: 2,
        //   group:group,
        // })
      },
      async handleSearch(value){
        const filter = value
        if(filter === ''){
          this.playlistData = this.playlist
        } else{
          const filterData = this.playlist.filter((item) => {
            if(item.name.indexOf(filter) !== -1){
              return item
            }
          })
          this.playlistData = filterData.length > 0 ? filterData : this.playlist
        }
      },
      changeSearchValue(e){
        const filter = e.data
        if(filter === '' || filter === null){
          this.playlistData = this.playlist
        } else {
          const filterData = this.playlist.filter((item) => {
            if(item.name.indexOf(filter) !== -1){
              return item
            }
          })
          this.playlistData = filterData.length > 0 ? filterData : this.playlist
        }
      },
      handleTransformFormat(){

      },
      allowDrop(ev){
        ev.preventDefault()
      },
      drag(ev){
        ev.dataTransfer.setData('Text',ev.target.id)

      },
      drop(ev){
        console.log(this.selectionValue)
        ev.preventDefault()
        const elTargetId = ev.dataTransfer.getData('Text')
        console.log(ev)
        ev.target.appendChild(document.getElementById(elTargetId))
        let newSort = []
        const newList = document.getElementsByClassName('group-item')
        newList.forEach((item) => {
          newSort.push((item.id).replace('span', ''))
        })
        console.log(newSort)

      },
    },
    computed: {
      ...mapGetters('BasicLibrary',[
          'playlist',
      ])
    },
    created(){
      this.playlistData = this.playlist

    },
  }
</script>

<style scoped>
  /deep/ .ivu-input {
    border: none;
    border-radius: unset;
    border-bottom: 1px solid gainsboro;
  }
  /deep/ .ivu-input:focus {
    border: none;
    border-radius: unset;
    border-bottom: 1px solid gainsboro;
  }
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
  .group-item {
    display: block;
    margin:5px 0 5px 10px;
    padding-left:5px;
    font-size: 13px;
    width: 100%;
    height: 15px;
  }

</style>