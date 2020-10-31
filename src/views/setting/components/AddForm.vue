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
              let filesData = response.data.files
              const filesCount = filesData.length
              if(msg.length > 0){
                this.$Message.error('╮(￣▽￣)╭ ' + msg)
              }
              // 存储视频库信息
              const saveLibraries = await this.saveLibrariesData({name:this.addLibrary.name, dirPath: this.addLibrary.dirPath, filesCount: filesCount})
              if(!saveLibraries){
                this.$Message.error('╮(￣▽￣)╭ 保存文件时出现错误，请稍后从重试~')
                return
              }
              if(filesCount > 0){
                const library_id = saveLibraries._id
                // 存储视频库内文件信息
                filesData.forEach((item) => {
                  item.library_id = library_id
                })
                const saveFilesStatus = await this.saveFilesData(filesData)
                if(!saveFilesStatus){
                  this.$Message.error('╮(￣▽￣)╭ 保存文件时出现错误，请稍后从重试~')
                  return
                }
              }
              this.$Message.success('视频库添加成功~')
              this.$emit('pushNewLibrary', saveLibraries)
              this.handleReset()
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
      async saveLibrariesData(data){
        // 判断该地址是否已存在，如已存在则直接返回警告信息！
        const checkFileExists  = await this.$db.libraries.findOne({dirPath: this.addLibrary.dirPath})
        if(checkFileExists !== null){
          this.$Message.warning('已存在该地址的视频库，请勿重复添加！')
          return false
        }
        return await this.$db.libraries.insert(data)
      },
      async saveFilesData(data){
        return await this.$db.filmsLibrary.insert(data)
      },
    }
  }
</script>

<style scoped>

</style>