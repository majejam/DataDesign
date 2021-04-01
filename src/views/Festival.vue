<template>
  <div>
    <div class="renderer" ref="renderer"></div>
    <Header />
    <button @click="Player.volume(0.5)">up volume</button>
    <div>
      <input type="range" step="0.1" id="volume" name="volume" :value="volume" @change="setVolume" min="0" max="1" />
      <label for="volume">Volume</label>
    </div>

    <img :src="$store.getters.getUser.images[0].url" alt="" srcset="" />
    <pre>
 USER INFO
    {{ this.$store.getters.getUser }}
  </pre
    >
    <pre>
    TOP ARTIST
  {{ this.$store.getters.getTopArtist }}

  </pre
    >
    <pre>
    TOP TRACKS
  {{ this.$store.getters.getTopTracksFeatures }}

  </pre
    >
  </div>
</template>

<script>
import Header from '@/components/shared/Header.vue'

import Engine from '@/GL/Engine.js'
import Player from '@/GL/Player.js'
import Bus from '@/utils/bus.js'

export default {
  components: { Header },
  name: 'Festival',
  data() {
    return {
      volume: this.$store.getters.getVolume,
      targetVolume: 0,
    }
  },
  beforeMount() {},
  mounted() {
    Player.init()

    if (this.$store.getters.getPlayerInit) {
      console.log('alreday igig')
      Engine.init(this.$refs.renderer)
    } else {
      Bus.$on('PlayerInit', () => {
        Engine.init(this.$refs.renderer)
      })
    }
  },
  methods: {
    setVolume(event) {
      //this.volume = event.target.value
      console.log(event.target.value)
      Player.setGlobalVolume(event.target.value)
      //Player.setFadeVolume(event.target.value, 100)
    },
  },
}
</script>

<style lang="scss">
.renderer {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

body {
  pre {
    color: red;
    font-family: var(--font-primary);

    @include media('<sm') {
      color: green;
    }
  }
}
</style>
