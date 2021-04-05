<template>
  <div :class="scrollClass">
    <div class="renderer" ref="renderer"></div>
    <Loader v-if="!loaded" />
    <Header />
    <pre>
    TOP TRACKS
  {{ this.$store.getters.getTopTracksFeatures }}

  </pre
    >
  </div>
</template>

<script>
import Header from '@/components/shared/Header.vue'
import Loader from '@/components/Loader.vue'

import Engine from '@/GL/Engine.js'
import Player from '@/GL/Player.js'
import DemoData from '@/assets/demo/state.json'
import Bus from '@/utils/bus.js'

export default {
  components: { Header, Loader },
  name: 'Demo',
  data() {
    return {
      volume: this.$store.getters.getVolume,
      targetVolume: 0,
      loaded: false,
    }
  },
  beforeMount() {},
  mounted() {
    this.events()
    this.$store.commit('setTopTracksFeatures', DemoData.personalization.topTracksFeatures)
    Engine.init(this.$refs.renderer)
  },
  methods: {
    setVolume(_e) {
      Player.setGlobalVolume(_e.target.value)
    },
    setLoaded() {
      this.loaded = true
    },
    events() {
      this._setLoaded = this.setLoaded.bind(this)
      Bus.$on('loaded', this._setLoaded)
    },
  },

  computed: {
    scrollClass() {
      return [
        {
          'no--scroll': !this.loaded,
        },
      ]
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
