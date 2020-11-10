<template>
  <div class="main-wrap">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'Main',
  data(){
    return {}
  }
}
</script>
<style lang="less" scoped>
  .main-wrap {
    margin: 10px 20px;
  }
</style>