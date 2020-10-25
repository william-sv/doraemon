<template>
  <div class="playlist-item">
    <Row>
      <Scroll :on-reach-bottom="handleLoadingFiles" height="600">
        <Col span="4" v-for="film in filmsList" :key="film._id">
          <div class="film-item" @click="handlePlayFilm(film.absolutePath)">
            <div class="film-poster-item" :style="{ backgroundImage: film.poster !== '' ? 'url(' + film.poster + ') ' : 'url(' + require('../../assets/no_poster.png') + ')' }">
              <img :src="require('../../assets/play.png')" class="film-play-btn">
            </div>
            <div class="film-name">
              {{ film.name.slice(0,15) }}
            </div>
          </div>
        </Col>
      </Scroll>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "FilmsList",
    data(){
      return {
        filmsList: [],
      }
    },
    methods: {
      handleLoadingFiles(){

      },
      handlePlayFilm(){

      },
    },
  }
</script>

<style scoped>
  .film-item {
    margin-bottom: 20px;
    cursor:pointer;
  }
  .film-poster-item {
    width: 100px;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .film-play-btn {
    width: 100%;
    height: 100%;
  }
  .film-name {
    width: 100px;
    font-size: 12px;
  }
</style>