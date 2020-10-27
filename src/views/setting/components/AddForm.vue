<template>
  <Form ref="Form" :model="addLibrary" :label-width="40">
    <FormItem label="名字" prop="name">
      <Input v-model="addLibrary.name" placeholder="请输入视频库名字"></Input>
    </FormItem>
    <FormItem label="地址" prop="absolutePath">
      <Row :gutter="10">
        <Col span="17">
          <Input v-model="addLibrary.absolutePath" placeholder="请输入或选择视频库地址"></Input>
        </Col>
        <Col span="6">
          <Button @click="choiceFolder" type="info" size="small">选择</Button>
        </Col>
      </Row>
    </FormItem>
  </Form>
</template>

<script>
  // const { dialog } = require('electron').remote
  export default {
    name: "AddForm",
    data(){
      return {
        addLibrary: {
          name: '',
          absolutePath: '',
        },
      }
    },
    methods: {
      handleSubmit(){
        console.log('save')
      },
      handleReset(){
        this.$refs['Form'].resetFields()
      },
      choiceFolder(){
        // const that = this
        // dialog.showOpenDialog({
        //   filters:[
        //     { name: 'All Files', extensions: ['*'] }
        //   ],
        //   properties: [
        //     'openDirectory',
        //   ],
        // }).then(result => {
        //   if(result.filePaths.length > 0){
        //     that.addLibrary.absolutePath = result.filePaths[0]
        //   }
        // }).catch(error => {
        //   console.log(error)
        // })
      },
    }
  }
</script>

<style scoped>

</style>