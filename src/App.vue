<template>
  <div id="app">
    <Row>
      <Col span="4">
        <div class="side-wrap">
          <LeftSide />
        </div>
      </Col>
      <Col span="20">
        <Main />
      </Col>
    </Row>
  </div>
</template>
<script>
  import LeftSide from './views/layouts/leftSide'
  import Main from './views/layouts/main'
  export default {
    name: 'app',
    components: {
      LeftSide,
      Main,
    },
  }
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
}
.side-wrap {
  width: calc(100vw / 24 * 4);
}
</style>
