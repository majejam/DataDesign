<template>
  <div class="scroll_height">
    <div ref="data_scroll_container" class="main-column-inner scroll_bg u-flex-column" data-scroll-container>
      <div data-scroll-section class="section section_jumbotron grid grid-column grid-start">
        <h1 class="main-title">Festivaly.</h1>
        <p>Experience the festival you deserve. Anytime. Anywhere.</p>
        <div>
          <Button primary @click.native="signIn()">Sign in to spotify</Button>
          <Button secondary><router-link to="/demo"> Test the demo </router-link></Button>
        </div>
      </div>
      <div data-scroll-section class="section section_paragraph grid grid-column">
        <h2 class="main-title" data-scroll data-scroll-direction="horizontal" data-scroll-speed="1">The concept</h2>
        <p class="main-description" data-scroll data-scroll-direction="horizontal">
          We used to spend our summers in festivals, and now Spotify is our only way to get vibed on and experience music. What if we added a whole new dimension to it? In Festivaly, you get the
          chance to roam between all your top artists stages in a cute isometric world.
        </p>
      </div>
      <div data-scroll-section class="section section_paragraph section_paragraph_r grid grid-column">
        <h2 class="main-title" data-scroll data-scroll-direction="horizontal" data-scroll-speed="-1">How it works</h2>
        <p class="main-description" data-scroll data-scroll-direction="horizontal">
          The datas are collected through Spotify Web API. We retrieve the 20 artists you've listened to the most on Spotify during the last 3 months. <br /><br />
          Metrics such as the popularity, the danceability and the energy are used to create a lively and personalized experience. <br />
          <br />
          Songs you love are then played through Spotify Web Playback SDK.
        </p>
      </div>
      <div data-scroll-section class="section section_credit grid grid-column">
        <h2 class="main-title" data-scroll :data-scroll-call="test" data-scroll-speed="3">Credit</h2>
        <p class="main-description" data-scroll data-scroll-speed="2">Thomas Lacroix, Morgane Lapisardi & Yoan Gross</p>
      </div>
    </div>
  </div>
</template>

<script>
import querystring from 'querystring'
import LocomotiveScroll from 'locomotive-scroll'
import Button from '@/components/shared/Button.vue'
export default {
  components: { Button },
  data() {
    return {
      scroll: null,
    }
  },
  methods: {
    init() {
      this.scroll = new LocomotiveScroll({
        el: this.$refs.data_scroll_container,
        smooth: true,
      })
    },
    test(_e) {
      console.log(_e)
    },
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
    //this.init()
  },
  deactivated() {
    this.scroll.destroy()
  },
  activated() {
    this.init()

    this.$nextTick(() => {
      //this.scroll.update()
    })
  },
}
</script>

<style lang="scss">
.scroll_height {
  flex-flow: column;
}

.scroll_bg {
  background: linear-gradient(180deg, #ff666f 0%, #f8ae84 50%, #fec961 100%);
}

.section {
  width: 50%;
  margin: 70px 0;

  &_jumbotron {
    margin: 0;
    height: 100vh;
  }

  &_paragraph {
    &_r {
      margin-left: auto;
    }
  }

  &_credit {
    height: 100vh;
    width: 100%;
  }
}
</style>
