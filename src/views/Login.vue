<template>
  <div ref="data_scroll_container" data-scroll-container>
    <div data-scroll-section>
      <h1 data-scroll>Hey</h1>
      <p data-scroll>👋</p>
      <div>
        <button @click.prevent="signIn()">Sign in to spotify</button>
      </div>
    </div>
    <div data-scroll-section>
      <h2 data-scroll data-scroll-speed="1">What's up?</h2>
      <p data-scroll data-scroll-speed="2">😬</p>
    </div>
  </div>
</template>

<script>
import querystring from 'querystring'
import LocomotiveScroll from 'locomotive-scroll'

export default {
  data() {
    return {
      scroll: null,
    }
  },
  methods: {
    signIn() {
      let url =
        'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: process.env.VUE_APP_SPOTIFY_CLIENT_ID,
          scope: 'user-read-private user-read-email streaming user-read-playback-state user-modify-playback-state user-read-currently-playing user-top-read',
          redirect_uri: process.env.VUE_APP_SPOTIFY_REDIRECT_URL,
        })
      window.location.href = url
    },
  },
  mounted() {
    this.scroll = new LocomotiveScroll({
      el: this.$refs.data_scroll_container,
      smooth: true,
    })
  },
}
</script>

<style scoped></style>
