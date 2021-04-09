<template>
  <transition name="song" appear mode="out-in">
    <div :key="name" class="CurrentSong">
      <span class="CurrentSong__name">{{ name }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
    },
  },
}
</script>

<style lang="scss">
.CurrentSong {
  position: absolute;
  width: 30%;
  height: 50px;
  overflow: hidden;
  bottom: 50px;
  left: 50px;
  opacity: 0;

  @include media('<sm') {
    width: 80%;
    left: 10%;
  }

  &__name {
    position: absolute;
    white-space: nowrap;
    color: white;
    font-family: var(--font-secondary);
    font-size: rem(22px);
    font-weight: 500;
    line-height: rem(42px);
    letter-spacing: 0em;
    animation: 10s linear 0s songSlide infinite;
  }

  @keyframes songSlide {
    0% {
      transform: translateX(0%);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    50% {
      transform: translateX(0%);
    }

    100% {
      transform: translateX(-100%);
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

.song-enter-active {
  transition: opacity 0.5s ease-in 10s;
}

.song-enter {
  opacity: 1;
}
</style>
