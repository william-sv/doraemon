<template>
  <div class="film-wrap">
    <div class="films-item" v-for="film in filmsData">
      {{ film.name }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'Films',
  data(){
    return {
      filmsList: [],
    }
  },
  props: {
    filmsData: {
      type: Array,
      defaylt: function(){
        return []
      }
    }
  },
}
</script>
<style lang="less" scoped>

</style>