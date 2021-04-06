<template>
  <header class="Header grid grid-between main-column-inner" :class="classes">
    <ul class="Header__links grid">
      <li class="Header__links__link">The concept</li>
      <li class="Header__links__link">How it works</li>
    </ul>
    <Button secondary @click.native="signIn()">Discover your festival</Button>
  </header>
</template>

<script>
import querystring from 'querystring'
import Button from '@/components/shared/Button.vue'
export default {
  components: { Button },
  props: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    right: {
      type: Boolean,
      default: false,
    },
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
  computed: {
    classes() {
      return [
        {
          'Section--right': this.right,
        },
      ]
    },
  },
}
</script>

<style lang="scss">
.Header {
  position: fixed;
  left: 0;
  width: 100%;
  top: 32px;
  z-index: 10;
  color: white;

  &__links {
    &__link {
      margin: 0 24px;
      cursor: pointer;
      font-family: var(--font-secondary);
      font-size: rem(16px);
      font-weight: 700;
      line-height: rem(20px);
    }
  }

  &--right {
    margin-left: auto;
  }
}
</style>
