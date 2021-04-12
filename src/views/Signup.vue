<template>
  <div class="scroll_height">
    <img v-show="false" src="images/loader.svg" alt="svg" />
    <img class="fixed__logo fixed_column" src="images/logo_white.svg" alt="logo festivaly" />
    <div ref="data_scroll_container" class="u-flex-column" data-scroll-container>
      <div data-scroll-section class="scroll_bg main-column-inner">
        <div class="relative grid grid-between">
          <div data-scroll :data-scroll-speed="speed" class="section section_jumbotron grid grid-column grid-start">
            <h1 class="h1-title">Festivaly.</h1>
            <p class="main-description">
              Experience your musical festival.<br />
              Discover your next musical crushes.<br />
              Curated by your Spotify tastes.
            </p>
            <div class="section_jumbotron_button grid grid-between grid-start">
              <div class="grid grid-column section_jumbotron_button--single">
                <Button primary @click.native="signIn()">Discover your festival</Button>
                <span>Requires a connection to your Spotify account through Spotify API.</span>
              </div>
              <Button secondary><router-link class="demo-link" to="/demo">Try the demo</router-link></Button>
            </div>
          </div>

          <div class="section_jumbotron_images section_jumbotron_images--responsive grid">
            <img class="section_jumbotron_images--single" src="images/home/home_01.png" alt="Festivaly illustration" />
          </div>
        </div>
        <div class="relative grid grid-between">
          <div class="section_jumbotron_images grid">
            <img class="section_jumbotron_images--single" src="images/home/home_02.png" alt="Festivaly illustration" />
          </div>
          <Section
            data-scroll
            :data-scroll-speed="speed"
            right
            title="Your own festival"
            description="We used to spend our summers in festivals, and now Spotify is our only way to get vibed on and experience music. What if we added a whole new dimension to it?<br /><br/>
In Festivaly, vibe on your favorite artist stages within a cute isometric world!        "
          />
        </div>

        <div class="relative grid grid-between">
          <Section
            data-scroll
            :data-scroll-speed="speed"
            title="Discover your next musical crushes"
            description="You might be one click away from your new favorite music. In Discovery World, each scene
          hosts an artist carefully selected based on your tastes.<br /><br /> Build as many discovery festivals as you want with the 'New Discovery Word' feature!"
          />
          <div class="section_jumbotron_images grid">
            <img class="section_jumbotron_images--single" src="images/home/home_03.png" alt="Festivaly illustration" />
          </div>
        </div>

        <div class="relative grid grid-between">
          <div class="section_jumbotron_images grid">
            <img class="section_jumbotron_images--single" src="images/home/home_03.png" alt="Festivaly illustration" />
          </div>
          <Section
            data-scroll
            :data-scroll-speed="speed"
            title="How it works"
            description="The datas are collected through Spotify Web API. We retrieve the 20 artists you've listened to the most on Spotify during the last 3 months.<br/><br/>Metrics such as the popularity, the danceability and the energy are used to create a lively and personalized experience. <br/><br/>
Songs you love are then played through Spotify Web Playback SDK.<br/><br/>Your top songs are combined into a unique seed. The “Discovery world” is filled by songs unknown to you that are the more relevant to the seed."
            right
          />
        </div>
        <div class="section section_credit grid grid-column">
          <h2 class="section-title" data-scroll data-scroll-speed="3">Credits</h2>
          <p class="section-description" data-scroll data-scroll-speed="4">
            Thomas Lacroix, Developer <br />
            Morgane Lapisardi, Illustrator<br />
            Yoan Gross, Designer
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
      speed: 3,
    }
  },
  methods: {
    init() {
      this.scroll = new LocomotiveScroll({
        el: this.$refs.data_scroll_container,
        smooth: true,
        tablet: {
          smooth: true,
        },
        smartphone: {
          smooth: true,
        },
      })

      this._resize = this.resize.bind(this)
      this.resize()
    },
    resize() {
      if (window.innerWidth < 767) {
        this.speed = 1
      } else {
        this.speed = 3
      }

      if (this.scroll) this.scroll.update()
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
    window.removeEventListener('resize', this._resize)
  },
  activated() {
    setTimeout(() => {
      this.init()
      window.addEventListener('resize', this._resize)

      setTimeout(() => {
        this.scroll.update()
      }, 500)
    }, 100)
  },
}
</script>

<style lang="scss">
.scroll_height {
  flex-flow: column;
}

.relative {
  position: relative;
}

.fixed__logo {
  position: fixed;
  bottom: 50px;
  z-index: 10;

  @include media('<md') {
    display: none;
  }
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

  @include media('<md') {
    width: 100%;
    margin: 0;
  }

  &_jumbotron {
    margin: 0;
    height: 100vh;

    @include media('<md') {
      padding: 10% 0;
    }

    h1 {
      margin-bottom: 16px;

      @include media('<sm') {
        width: 100%;
      }
    }

    p {
      margin-bottom: 40px;
    }

    &_button {
      width: 100%;

      @include media('<md') {
        justify-content: left !important;
        margin-top: auto;
      }

      @include media('<sm') {
        justify-content: center !important;
        margin-top: auto;
      }

      &--single {
        max-width: 288px;

        @include media('<md') {
          margin-right: 16px;
        }

        @include media('<sm') {
          margin-bottom: 24px;
          margin-right: 0;
          width: 100%;
        }
        span {
          margin-top: 8px;
          font-size: rem(14px);
          font-family: var(--font-secondary);
          font-weight: 500;
          line-height: rem(18px);
          text-align: center;
        }
      }
    }

    &_images {
      width: 50%;
      position: relative;
      height: auto;
      overflow: hidden;
      max-height: 100vh;

      @include media('<sm') {
        width: 100%;
        display: none !important;
      }

      &--single {
        width: 100%;
        height: auto;
        object-fit: contain;

        @include media('<md') {
          height: 50vh;
        }
      }

      &--responsive {
        @include media('<md') {
          display: block !important;
          position: absolute;
          top: 55%;
          transform: translateY(-50%);
          left: 0;
          width: 100%;
        }
        @include media('<sm') {
          display: block !important;
          top: 50%;
        }
      }
    }
  }

  &_credit {
    height: 50vh;
    width: 100%;

    @include media('<sm') {
      height: 30vh;
      justify-content: left !important;
      align-items: flex-start !important;
    }

    p {
      text-align: center;

      @include media('<sm') {
        text-align: left;
      }
    }
  }
}
</style>
