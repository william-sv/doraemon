<template>
  <Form ref="Form" :model="addLibrary" :label-width="40">
    <FormItem label="名字" prop="name">
      <Input v-model="addLibrary.name" placeholder="请输入视频库名字"></Input>
    </FormItem>
    <FormItem label="地址" prop="absolutePath">
      <Row>
        <Col span="18">
          <Input v-model="addLibrary.absolutePath" placeholder="请输入或选择视频库地址"></Input>
        </Col>
        <Col span="4" offset="1">
          <Button @click="selectFolder" type="info" size="small">选择</Button>
        </Col>
      </Row>
    </FormItem>
  </Form>
</template>

<script>
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
      selectFolder(){},
      handleSubmit(){
        console.log('save')
      },
      handleReset(){
        this.$refs['Form'].resetFields()
      },
    }
  }
</script>

<style scoped>

</style>