<template>
  <div :class="scrollClass">
    <div class="renderer" ref="renderer"></div>
    <CurrentSong v-if="loaded" :song="$store.getters.getCurrentSong" />
    <Menu v-if="loaded" :song="$store.getters.getCurrentSong" :demo="true" />
    <Loader v-if="!loaded" />
  </div>
</template>

<script>
import CurrentSong from '@/components/UI/CurrentSong.vue'
import Menu from '@/components/UI/Menu.vue'
import Loader from '@/components/Loader.vue'

import Engine from '@/GL/Engine.js'
import DemoData from '@/assets/demo/state.json'
import Bus from '@/utils/bus.js'

export default {
  components: { Loader, CurrentSong, Menu },
  name: 'Demo',
  data() {
    return {
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
