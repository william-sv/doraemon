<template>
  <div class="library-wrap">
    <h3 style="text-align: center;margin-bottom: 10px;">本地视频库管理</h3>
    <div style="display: flex;justify-content: flex-end;margin-bottom: 10px;">
      <Button  type="success" size="small" icon="md-add" @click="openAddLibraryModal = true">新增</Button>
    </div>
    <Table border stripe height="700" size="small" :columns="columns" :data="librariesData">
      <template slot-scope="{ row, index }" slot="action">
        <Poptip trigger="hover" content="查看视频库内文件" placement="top-end">
          <Button style="margin-right: 5px;" type="info" size="small" icon="ios-eye" @click="handleViewFiles(row._id,row.name)" shape="circle"></Button>
        </Poptip>
        <Poptip trigger="hover" content="更新视频库" placement="top-end">
          <Button style="margin-right: 5px;" type="success" size="small" icon="md-refresh" @click="handleReloadFiles(row._id,row.dirPath)" shape="circle"></Button>
        </Poptip>
        <Poptip trigger="hover" content="将视频库合并至播放列表" placement="top-end">
          <Button style="margin-right: 5px;" type="primary" size="small" icon="ios-list-box" @click="handleAppendPlaylist(row._id)" shape="circle"></Button>
        </Poptip>
        <Poptip trigger="hover" content="删除视频库及缓存的文件" placement="top-end">
          <Button type="error" size="small" icon="ios-trash" @click="handleDelLibrary(index,row._id)" shape="circle"></Button>
        </Poptip>
      </template>
    </Table>
    <Modal v-model="openAddLibraryModal" width="400" @on-cancel="handleCancel">
      <p slot="header" style="text-align:center;">
        新增视频库
      </p>
      <AddForm ref="addForm" @pushNewLibrary="handleAddNewLibrary" />
      <Alert type="warning" show-icon>
        关于 地址 字段的注释
        <template slot="desc">
          1.该地址为您电脑上存放视频的文件夹地址<br />
          2.确认后会生成该文件夹下视频文件的缓存
        </template>
      </Alert>
      <div slot="footer">
        <Button type="success" @click="handleAddLibrary" long>确认</Button>
      </div>
    </Modal>
    <Modal v-model="openViewFilesModal" width="80%" @on-cancel="handleViewFilesCancel" :footer-hide="true">
      <div slot="header" style="text-align: center;font-weight: bold;font-size: 14px;">
        {{ viewLibraryFilesTitle !== '' ? viewLibraryFilesTitle : '无标题'}}
      </div>
      <FilesTable ref="filesTable" :filesData="filesData" />
    </Modal>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import AddForm from "@/views/setting/components/AddForm"
  import FilesTable from "@/views/setting/components/FilesTable"
  export default {
    name: "Library",
    data(){
      return {
        openAddLibraryModal: false,
        openViewFilesModal: false,
        columns: [
          {
            title: '库名',
            key: 'name',
            width: '150'
          },
          {
            title: '地址',
            key: 'dirPath',
          },
          {
            title: '文件数量',
            key: 'filesCount',
            width: '90'
          },
          {
            title: '操作',
            slot: 'action',
            width: '150'
          },
        ],
        librariesData: [],
        viewLibraryFilesTitle: '',
        filesData: [],
      }
    },
    components: {
      AddForm,
      FilesTable
    },
    methods: {
      handleAddLibrary(){
        this.$refs.addForm.handleSubmit()
        this.openAddLibraryModal = false
      },
      handleCancel(){
        this.$refs.addForm.handleReset()
      },
      handleDelLibrary(index,id){
        this.$Modal.confirm({
          title: '删除视频库',
          content: '该操作将删除此视频库记录，并清空相应的播放列表记录~（仅删除本软件上的相关记录，不会删除源文件）',
          okText: '删除',
          onOk: async () => {
            this.librariesData.splice(index,1)
            await this.deleteLibrary(id) // 删除视频库及视频库内文件
            this.$Message.success({
              background: true,
              content: '已删除'
            });
          },
          onCancel: () => {
            this.$Message.info({
              background: true,
              content: '已取消删除'
            })
          }
        })
      },
      async handleViewFiles(id,name){
        this.filesData = await this.getLibraryFiles(id)
        this.viewLibraryFilesTitle = name
        this.openViewFilesModal = true
      },
      handleViewFilesCancel(){
        this.$refs['filesTable'].restPageSetting()
      },
      async deleteLibrary(id){
        await this.$db.libraries.remove({_id: id})
        await this.$db.filmsLibrary.remove({library_id: id}, { multi: true }) // { multi: true } 允许删除多个文件
      },
      handleAddNewLibrary(newLibrary){
        this.librariesData.push(newLibrary)
      },
      async getLibrariesData(){
        this.librariesData = await this.$db.libraries.sort({created_at:-1}).find()
      },
      async getLibraryFiles(id){
        return await this.$db.filmsLibrary.sort({created_at:-1}).find({library_id: id})
      },
      handleReloadFiles(library_id,dirPath){
        this.$Modal.confirm({
          title: '更新视频库数据',
          content: '该操作会更新视频库内的文件数据',
          okText: '添加',
          onOk: async () => {
            await this.compareFiles(dirPath,library_id)
            this.$Message.success({
              background: true,
              content: '视频库已更新'
            });
          },
          onCancel: () => {
            this.$Message.info({
              background: true,
              content: '已取消该操作'
            })
          }
        })
      },
      handleAppendPlaylist(library_id){
        this.$Modal.confirm({
          title: '添加至播放列表',
          content: '该操作会将此视频库内的文件添加至播放列表中',
          okText: '添加',
          onOk: async () => {
            await this.appendPlaylist(library_id)
            this.$Message.success({
              background: true,
              content: '已添加至播放列表'
            });
          },
          onCancel: () => {
            this.$Message.info({
              background: true,
              content: '已取消该操作'
            })
          }
        })
      },
      async appendPlaylist(library_id){
        let filesData = await this.getLibraryFiles(library_id)
        for (const item of filesData) {
          let result = await this.$db.playlistLibrary.findOne({oldName: item.name,file_id: [item._id],library_id: item.library_id})
          if(!result){
            let name = item.name.slice(0,item.name.lastIndexOf('.')) //去除后缀名
            await this.$db.playlistLibrary.insert({
              name: name,
              oldName: name,
              fileFormat: item.fileFormat,
              library_id: item.library_id,
              created_at: item.created_at,
              file_id: item._id,
              status: 1,
            })
          }
        }
      },
      async getDirFiles(dirPath){
        let folderFiles
        await this.$http.get('http://localhost:1221/folder?path=' + encodeURIComponent(dirPath)).then((response) => {
          const msg = response.data.msg
          let filesData = response.data.files
          if(msg.length > 0){
            this.$Message.error('╮(￣▽￣)╭ ' + msg)
          }
          folderFiles = filesData
        })
        return folderFiles
      },
      async compareFiles(dirPath,library_id){
        let folderFiles = []
        let libraryFiles = []
        let libraryFilesData = []
        let removeFiles = []
        let addFiles = []
        folderFiles = await this.getDirFiles(dirPath)
        libraryFiles = await this.getLibraryFiles(library_id)
        libraryFiles.forEach((item) => {
          libraryFilesData[item.name] = item
        })
        folderFiles.forEach((item) => {
          if(libraryFilesData.hasOwnProperty(item.name)){
            libraryFiles.splice(item,1)
          } else {
            addFiles.push(item)
          }
        })
        removeFiles = libraryFiles
        console.log(addFiles)
        console.log(removeFiles)
      },
    },
    computed: {
      ...mapGetters('BasicLibrary',[
        'libraries',
        'films'
      ])
    },
    created(){
      this.librariesData = this.libraries
    }
  }
</script>

<style scoped>

</style>