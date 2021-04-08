<template>
  <div class="scroll_height">
    <img v-show="false" src="images/loader.svg" alt="svg" />
    <img class="fixed__logo fixed_column" src="images/logo_white.svg" alt="logo festivaly" />
    <div ref="data_scroll_container" class="u-flex-column" data-scroll-container>
      <div data-scroll-section class="scroll_bg main-column-inner">
        <div class="grid grid-between">
          <div data-scroll data-scroll-speed="3" class="section section_jumbotron grid grid-column grid-start">
            <h1 class="h1-title">Festivaly.</h1>
            <p class="main-description">Experience your musical festival. Curated by your Spotify tastes.</p>
            <div class="section_jumbotron_button grid grid-between grid-start">
              <div class="grid grid-column section_jumbotron_button--single">
                <Button primary @click.native="signIn()">Discover your festival</Button>
                <span>Requires a connection to your Spotify account through Spotify API.</span>
              </div>
              <Button secondary><router-link class="demo-link" to="/demo">Try the demo</router-link></Button>
            </div>
          </div>

          <div class="section_jumbotron_images">
            <div class="section_jumbotron_images--single"></div>
            <div class="section_jumbotron_images--single"></div>
            <div class="section_jumbotron_images--single"></div>
          </div>
        </div>
        <div data-scroll data-scroll-speed="3">
          <Section
            title="The concept"
            description="We used to spend our summers in festivals, and now Spotify is our only way to get vibed on and experience music. What if we added a whole new dimension to it? <br /><br />
          In Festivaly, you get the chance to roam between all your top artists stages in a cute isometric world.
        "
          />
        </div>

        <div data-scroll data-scroll-speed="3">
          <Section
            title="How it works"
            description="The datas are collected through Spotify Web API. We retrieve the 20 artists you've listened to the most on Spotify during the last 3 months. <br /><br />
          Metrics such as the popularity, the danceability and the energy are used to create a lively and personalized experience. <br />
          <br />
          Songs you love are then played through Spotify Web Playback SDK."
            right
          />
        </div>
        <div class="section section_credit grid grid-column">
          <h2 class="section-title" data-scroll data-scroll-speed="3">Credit</h2>
          <p class="section-description" data-scroll data-scroll-speed="2">
            Thomas Lacroix, developer <br />
            Morgane Lapisardi, illustrator<br />
            Yoan Gross, designer
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import querystring from 'querystring'
import LocomotiveScroll from 'locomotive-scroll'
import Button from '@/components/shared/Button.vue'
import Section from '@/components/home/Section.vue'
export default {
  components: { Button, Section },
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
    setTimeout(() => {
      this.init()

      this.$nextTick(() => {
        this.scroll.update()
      })
    }, 100)
  },
}
</script>

<style lang="scss">
.scroll_height {
  flex-flow: column;
}

.fixed__logo {
  position: fixed;
  bottom: 50px;
  z-index: 10;
}

.scroll_bg {
  background: linear-gradient(180deg, #ff666f 0%, #f8ae84 50%, #fec961 100%);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background-image: url('../assets/images/noise.png');
    opacity: 0.05;
  }
}

.section {
  width: 50%;
  margin: 70px 0;
  z-index: 2;
  color: white;

  &_jumbotron {
    margin: 0;
    height: 100vh;

    h1 {
      margin-bottom: 16px;
    }

    p {
      margin-bottom: 40px;
    }

    &_button {
      width: 100%;

      &--single {
        max-width: 288px;
        span {
          margin-top: 8px;
          font-family: var(--font-secondary);
          font-size: rem(14px);
          font-weight: 500;
          line-height: rem(18px);
          text-align: center;
        }
      }
    }

    &_images {
      width: 50%;
      position: relative;
      height: 100%;

      &--single {
        width: 200px;
        height: auto;
        flex: 1;

        &:nth-child(1) {
          position: absolute;
          background: grey;
        }

        &:nth-child(2) {
          position: absolute;
          background: pink;
        }

        &:nth-child(3) {
          position: absolute;
          background: yellow;
        }
      }
    }
  }

  &_credit {
    height: 50vh;
    width: 100%;
    p {
      text-align: center;
    }
  }
}
</style>
