<template>
  <div class="left-side-wrap">
    <div class="menu-wrap">
      <div v-for="menu in menus">
        <span class="menu-group-title">{{ menu.name }}</span>
        <div :class="['menu-item', item.path === activePath ? 'menu-active' : '']" v-for="item in menu.children" @click="jumpTo(item.path)">
          <Icon :type="item.icon" />
          <span class="menu-item-title">{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LeftSide',
  data(){
    return {
      activePath: '/local',
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
              path: '/library',
            },
            {
              name: '播放列表',
              icon: 'ios-list-box-outline',
              path: '/playlist',
            },
            {
              name: '杂质词管理',
              icon: 'ios-barcode-outline',
              path: '/impurities',
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
        this.activePath = path
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
    height: calc(100vh - 25px);
    background-color: #f8f8f9;
  }
  .menu-wrap {
    padding-top: 10px;
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
    margin: 10px 20px 10px 10px;
    border-radius: 10px;
    cursor:pointer;
  }
  .menu-item-title {
    display: inline-block;
    margin-left: 10px;
  }
  .menu-item:hover {
    //background-color: #2d8cf0;
    color: #5cadff;
  }
  .menu-active {
    background-color: rgba(92,173,256,.2);
    color: #5cadff;
  }
  
</style>