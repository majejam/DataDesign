<template>
  <transition name="song" appear mode="out-in" v-on:after-enter="afterEnter">
    <a ref="container" v-if="song.external_urls.spotify" :href="song.external_urls.spotify" target="_blank" :key="song.name" class="CurrentSong grid grid-left">
      <span class="CurrentSong__name" ref="text" :class="classes">{{ song.name }} - {{ song.artists[0].name }}</span>
    </a>
  </transition>
</template>

<script>
export default {
  props: {
    song: {
      type: Object,
    },
  },
  data() {
    return {
      isFull: false,
    }
  },
  methods: {
    afterEnter() {
      if (this.$refs.container.offsetWidth - 32 < this.$refs.text.offsetWidth) {
        this.isFull = true
      } else {
        this.isFull = false
      }
    },
  },
  computed: {
    classes() {
      return [
        {
          'CurrentSong__name--animation': this.isFull,
        },
      ]
    },
  },
}
</script>

<style lang="scss">
.CurrentSong {
  position: absolute;
  max-width: 270px;
  height: 48px;
  overflow: hidden;
  top: 40px;
  left: 50px;
  opacity: 1;
  background: var(--primary-base);
  border-radius: 8px;
  padding: 0 16px;
  text-decoration: none;

  @include media('<sm') {
    width: calc(80% - 100px);
    left: 10%;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    height: 100%;
    width: 16px;
    background: var(--primary-base);
    border-radius: 8px;
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 16px;
    background: var(--primary-base);
    border-radius: 8px;
  }

  &__name {
    white-space: nowrap;
    color: var(--neutral-white);
    font-family: var(--font-secondary);
    font-size: rem(14px);
    font-weight: 500;
    line-height: rem(42px);
    letter-spacing: 0em;

    &--animation {
      animation: 10s linear 0s songSlide infinite;
    }
  }

  @keyframes songSlide {
    0% {
      transform: translateX(0%);
      opacity: 1;
    }
    20% {
      transform: translateX(0%);
    }
    90% {
      transform: translateX(-100%);
      opacity: 1;
    }
    91% {
      transform: translateX(-100%);
      opacity: 0;
    }

    95% {
      transform: translateX(0%);
      opacity: 0;
    }

    100% {
      transform: translateX(0%);
      opacity: 1;
    }
  }
}

.song-enter-active,
.song-leave-active {
  transition: opacity 0.5s ease-in 0s;
}
.song-enter, .song-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
