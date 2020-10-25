<template>
  <div class="init-wrap">
    <Alert style="margin-top:20px;" show-icon>
        程序正在初始化，请稍等片刻~
    </Alert>
    <div class="init-category">
      <Icon size="18" type="ios-cog-outline" />
      <div class="init-title">影视剧分类数据初始化</div>
      <div class="init-btn">
        <Button type="success" size="small">初始化</Button>
      </div>
    </div>
    <div class="init-category">
      <Icon size="18" type="ios-cog-outline" />
      <div class="init-title">影视剧视频库数据初始化</div>
      <div class="init-btn">
        <Button type="success" size="small">初始化</Button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Init',
  data(){
    return {
      current: 0,
      categories: [
        '科幻','喜剧','动作','奇幻','冒险','武侠','爱情','悬疑','惊悚','恐怖','犯罪','音乐','歌舞','传记','历史','战争','西部','灾难','动画',
      ],
    }
  },
  methods: {
    initCategory(){

    },
    saveToDB(){

    }
  }
}
</script>
<style lang="less" scoped>
  .init-wrap {
    width: calc(100vw - 40px);
    margin: 20px;
  }
  .init-title {
    display: inline-block;
    margin-left: 10px;
    width: 25%;
    font-size: 15px;
  }
  .init-btn {
    display: inline-block;
    margin-top: 20px;
    margin-left: 20px;
  }
</style>