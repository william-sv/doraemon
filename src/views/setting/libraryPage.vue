<template>
  <div class="library-wrap">
    <h3 style="text-align: center;margin-bottom: 10px;">本地视频库管理</h3>
    <div style="display: flex;justify-content: flex-end;margin-bottom: 10px;">
      <Button  type="success" size="small" icon="md-add" @click="openAddLibraryModal = true">新增</Button>
    </div>
    <Table border stripe height="600" size="small" :columns="columns" :data="libraryData">
      <template slot-scope="{ row, index }" slot="action">
        <Button style="margin-right: 5px;" type="success" size="small" icon="ios-eye">查看</Button>
        <Button type="error" size="small" icon="ios-trash" @click="handleDelLibrary">删除</Button>
      </template>
    </Table>
    <Modal v-model="openAddLibraryModal" width="400" @on-cancel="handleCancel">
      <p slot="header" style="text-align:center;">
        新增视频库
      </p>
      <AddForm ref="addForm" />
      <div slot="footer">
        <Button type="success" @click="handleAddLibrary" long>确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import AddForm from "@/views/setting/components/AddForm"
  export default {
    name: "Library",
    data(){
      return {
        openAddLibraryModal: false,
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
        libraryData: [
          {
            name: '视频库1',
            absolutePath: '/Users/will/movie',
          },
          {
            name: '视频库2',
            absolutePath: '/Users/will/movie',
          },
          {
            name: '视频库3',
            absolutePath: '/Users/will/movie',
          },
          {
            name: '视频库4',
            absolutePath: '/Users/will/movie',
          },
        ]
      }
    },
    components: {
      AddForm,
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
    }
  }
</script>

<style scoped>

</style>