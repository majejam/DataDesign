<template>
  <div>
    <button @click.prevent="signIn()">Sign in to spotify</button>
    <router-link to="/demo"> Test the demo </router-link>
  </div>
</template>

<script>
import querystring from 'querystring'
export default {
  methods: {
    signIn() {
      let url =
        'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: process.env.VUE_APP_SPOTIFY_CLIENT_ID,
          scope: 'user-read-private user-read-email streaming user-read-recently-played user-read-playback-state user-modify-playback-state user-read-currently-playing user-top-read',
          redirect_uri: process.env.VUE_APP_SPOTIFY_REDIRECT_URL,
        })
      window.location.href = url
    },
  },
}
</script>

<style scoped></style>
