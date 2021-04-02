<template>
  <div>
    <div class="renderer" ref="renderer"></div>
    <Header />
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

import DemoData from '@/assets/demo/state.json'
import Store from '@/store'

export default {
  components: { Header },
  name: 'Demo',
  data() {
    return {
      volume: this.$store.getters.getVolume,
      targetVolume: 0,
    }
  },
  beforeMount() {},
  mounted() {
    Store.commit('setTopTracksFeatures', DemoData.personalization.topTracksFeatures)
    Engine.init(this.$refs.renderer)
  },
  methods: {
    setVolume(event) {
      //this.volume = event.target.value
      console.log(event.target.value)
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
