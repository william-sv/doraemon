<template>
  <div class="library-wrap">
    <h3 style="text-align: center;margin-bottom: 10px;">本地视频库管理</h3>
    <div style="display: flex;justify-content: flex-end;margin-bottom: 10px;">
      <Button  type="success" size="small" icon="md-add" @click="openAddLibraryModal = true">新增</Button>
    </div>
    <Table border stripe height="600" size="small" :columns="columns" :data="libraryData">
      <template slot-scope="{ row, index }" slot="action">
        <Button style="margin-right: 5px;" type="success" size="small" icon="ios-eye" @click="handleViewFiles">查看</Button>
        <Button type="error" size="small" icon="ios-trash" @click="handleDelLibrary">删除</Button>
      </template>
    </Table>
    <Modal v-model="openAddLibraryModal" width="400" @on-cancel="handleCancel">
      <p slot="header" style="text-align:center;">
        新增视频库
      </p>
      <AddForm ref="addForm" />
      <Alert type="warning" show-icon>
        <template slot="desc">
          1.该地址为您电脑上存放视频的文件夹地址<br />
          2.确认后会生成该文件夹下视频文件的缓存
        </template>
      </Alert>
      <div slot="footer">
        <Button type="success" @click="handleAddLibrary" long>确认</Button>
      </div>
    </Modal>
    <Modal v-model="openViewFilesModal" width="80%" :footer-hide="true">
      <div slot="header" style="text-align: center;font-weight: bold;font-size: 14px;">
        视频库1
      </div>
      <FilesTable />
    </Modal>
  </div>
</template>

<script>
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
            key: 'absolutePath',
          },
          {
            title: '操作',
            slot: 'action',
            width: '170'
          },
        ],
        libraryData: [],
      }
    },
    components: {
      AddForm,
      FilesTable
    },
    methods: {
      handleAddLibrary(){
        this.$refs.addForm.handleSubmit()
      },
      handleCancel(){
        this.$refs.addForm.handleReset()
      },
      handleDelLibrary(){
        this.$Modal.confirm({
          title: '删除视频库',
          content: '该操作将删除此视频库记录，并清空相应的播放列表记录~（仅删除本软件上的相关记录，不会删除源文件）',
          okText: '删除',
          onOk: () => {
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
      handleViewFiles(){
        this.openViewFilesModal = true
      },
    }
  }
</script>

<style scoped>

</style>