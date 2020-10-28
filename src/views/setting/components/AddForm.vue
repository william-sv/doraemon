<template>
  <Form ref="Form" :model="addLibrary" :rules="rules" :label-width="60">
    <FormItem label="名字" prop="name">
      <Input v-model="addLibrary.name" placeholder="请输入视频库名字"></Input>
    </FormItem>
    <FormItem label="地址" prop="dirPath">
      <Row :gutter="10">
        <Col span="17">
          <Input v-model="addLibrary.dirPath" placeholder="请输入或选择视频库地址"></Input>
        </Col>
        <Col span="6">
          <Button @click="choiceFolder" type="info" size="small">选择</Button>
        </Col>
      </Row>
    </FormItem>
  </Form>
</template>

<script>
  const { dialog } = require('electron').remote
  export default {
    name: "AddForm",
    data(){
      return {
        addLibrary: {
          name: '',
          dirPath: '',
        },
        rules: {
          name: [
            { required: true, message: '视频库名字不能为空', trigger: 'blur' }
          ],
          dirPath: [
            { required: true, message: '视频库地址不能为空', trigger: 'blur' }
          ],
        },
      }
    },
    methods: {
      async handleSubmit(){
        this.$refs['Form'].validate((valid) => {
          if(valid){
            this.$http.get('http://localhost:1221/folder?path=' + encodeURIComponent(this.addLibrary.dirPath)).then(async (response) => {
              const msg = response.data.msg
              const filesData = response.data.files
              if(msg.length > 0){
                this.$Message.error('╮(￣▽￣)╭ ' + msg)
              }
              const saveMsg = await this.saveData(filesData)
              if(saveMsg === '保存失败'){
                this.$Message.error('╮(￣▽￣)╭ 保存文件出现错误，请稍后从重试~')
              }
              this.$Message.success('视频库添加成功~')
            }).catch((error) => {
              console.log(error)
              this.$Message.error('╮(￣▽￣)╭ 读取文件夹内文件出现错误，请稍后从重试~')
            })
          } else {
            this.$Message.error('╮(￣▽￣)╭ 表单数据未填写完整，请检查后重试！')
          }
        })
      },
      handleReset(){
        this.$refs['Form'].resetFields()
      },
      choiceFolder(){
        const that = this
        dialog.showOpenDialog({
          filters:[
            { name: 'All Files', extensions: ['*'] }
          ],
          properties: [
            'openDirectory',
          ],
        }).then(result => {
          if(result.filePaths.length > 0){
            that.addLibrary.dirPath = result.filePaths[0]
            console.log()
          }
        }).catch(error => {
          console.log(error)
        })
      },
      async saveData(data){
        let msg = '保存成功'
        this.$db.filmsLibrary.insert(data, (err,doc) => {
          if(err){
            msg = '保存失败'
          }
        })
        return msg
      },
    }
  }
</script>

<style scoped>

</style>