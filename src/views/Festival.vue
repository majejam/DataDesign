<template>
  <div :class="scrollClass">
    <div class="renderer" ref="renderer" :class="classes"></div>
    <Loader v-if="!loaded" />
    <Header />
    <div>
      <input type="range" step="0.1" id="volume" name="volume" :value="volume" @change="setVolume" min="0" max="1" />
      <label for="volume">Volume</label>
    </div>

    <img v-if="$store.getters.getUser.images.length" :src="$store.getters.getUser.images[0].url" alt="" srcset="" />
    <div class="cta-font" v-if="debug">
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
  </div>
</template>

<script>
import Header from '@/components/shared/Header.vue'
import Loader from '@/components/Loader.vue'

import Engine from '@/GL/Engine.js'
import Player from '@/GL/Player.js'
import Bus from '@/utils/bus.js'

export default {
  components: { Header, Loader },
  name: 'Festival',
  data() {
    return {
      volume: this.$store.getters.getVolume,
      targetVolume: 0,
      debug: false,
      grabbing: false,
      loaded: false,
    }
  },
  beforeMount() {},
  mounted() {
    Player.init()

    this.events()

    if (this.$store.getters.getPlayerInit) {
      console.log('Already init')
      Engine.init(this.$refs.renderer)
    } else {
      Bus.$on('PlayerInit', () => {
        Engine.init(this.$refs.renderer)
      })
    }
  },
  methods: {
    setVolume(_e) {
      this.volume = parseFloat(_e.target.value)
      Player.setGlobalVolume(parseFloat(_e.target.value))
    },
    changeCursor(_e) {
      this.grabbing = _e
    },
    setLoaded() {
      this.loaded = true
    },
    events() {
      this._changeCursor = this.changeCursor.bind(this)
      this._setLoaded = this.setLoaded.bind(this)
      Bus.$on('grabbing', this._changeCursor)
      Bus.$on('loaded', this._setLoaded)
    },
  },
  computed: {
    classes() {
      return [
        {
          'renderer--grab': this.grabbing,
        },
      ]
    },
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
  cursor: grab;
  font-family: var(--font-primary);

  &--grab {
    cursor: grabbing;
  }
}

.no--scroll {
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
