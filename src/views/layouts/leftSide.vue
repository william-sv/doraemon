<template>
  <div class="left-side-wrap">
    <div class="menu-wrap">
      <div v-for="menu in menus">
        <span class="menu-group-title">{{ menu.name }}</span>
        <div class="menu-item" v-for="item in menu.children" @click="jumpTo(item.path)">
          <Icon :type="item.icon" />
          <span class="menu-item-title">{{item.name}}</span>
        </div>
      </div>
<!--      <span class="menu-group-title">网络资源</span>-->
<!--      <div class="menu-item" v-for="menu in menus.web" @click="jumpTo(menu.path)">-->
<!--        <Icon :type="menu.icon" />-->
<!--        <span class="menu-item-title">{{menu.name}}</span>-->
<!--      </div>-->
<!--      <span class="menu-group-title">设置</span>-->
<!--      <div class="menu-item" v-for="menu in menus.setting" @click="jumpTo(menu.path)">-->
<!--        <Icon :type="menu.icon" />-->
<!--        <span class="menu-item-title">{{menu.name}}</span>-->
<!--      </div>-->
    </div>
  </div>
</template>
<script>
export default {
  name: 'LeftSide',
  data(){
    return {
      menus: [
        {
          name: '本地资源',
          children: [
            {
              name: '本地视频',
              icon: 'ios-folder-outline',
              path: '/local',
            },
          ]
        },
        {
          name: '网络资源',
          children: [
            {
              name: '日剧',
              icon: 'ios-cloud-outline',
              path: '/web/jp'
            },
            {
              name: '美剧',
              icon: 'ios-cloud-outline',
              path: '/web/mj'
            },
            {
              name: '综合',
              icon: 'ios-cloud-outline',
              path: '/web/btdx8'
            },
          ]
        },
        {
          name: '设置',
          children: [
            {
              name: '视频库管理',
              icon: 'ios-film-outline',
              path: '/local-library',
            },
            {
              name: '关于',
              icon: 'ios-information-circle-outline',
              path: '/about',
            },
          ]
        }
      ]
    }
  },
  methods: {
    jumpTo(path){
      if (this.$route.path !== path && path !== '') {
        this.$router.push({
          path: path
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .left-side-wrap {
    height: 100vh;
    background-color: #f8f8f9;
  }
  .menu-wrap {
    padding-top: 20px;
  }
  .menu-group-title {
    padding-left: 10px;
    color: #808695;
  }
  .menu-item {
      display: flex;
      height: 30px;
      text-align: center;
      align-items: center;
      justify-content: start;
      padding-left: 10px;
      margin: 10px;
      border-radius: 10px;
  }
  .menu-item-title {
    display: inline-block;
    margin-left: 10px;
  }
  .menu-item:hover {
    background-color: #2d8cf0;
    color: #ffffff;
  }
  
</style>