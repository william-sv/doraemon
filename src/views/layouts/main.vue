<template>
  <div class="main-wrap">
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
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