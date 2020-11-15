<template>

</template>

<script>
  export default {
    name: "FilmTable",
    data(){
      return {

      }
    },
    props: {
      filmsData: {
        type: Array,
        default:function(){
          return []
        }
      }
    }
  }
</script>

<style scoped>

</style>