<template>
  <div :class="scrollClass">
    <div class="renderer" ref="renderer" :class="classes"></div>
    <CurrentSong v-if="loaded" :song="$store.getters.getCurrentSong" />
    <Menu v-if="loaded" :song="$store.getters.getCurrentSong" />
    <Loader v-if="!loaded" />
  </div>
</template>

<script>
import CurrentSong from '@/components/UI/CurrentSong.vue'
import Menu from '@/components/UI/Menu.vue'
import Loader from '@/components/Loader.vue'

import Engine from '@/GL/Engine.js'
import Player from '@/GL/Player.js'
import Bus from '@/utils/bus.js'

export default {
  components: { Loader, CurrentSong, Menu },
  name: 'Festival',
  data() {
    return {
      grabbing: false,
      loaded: false,
    }
  },
  beforeMount() {},
  mounted() {
    Player.init()

    this.events()

    if (this.$store.getters.getPlayerInit) {
      Engine.init(this.$refs.renderer)
    } else {
      Bus.$on('PlayerInit', () => {
        Engine.init(this.$refs.renderer)
      })
    }
  },
  methods: {
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
      Bus.$on('NewFestival', () => {
        this.loaded = false
      })
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
  font-family: var(--font-secondary);

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
    font-family: var(--font-secondary);

    @include media('<sm') {
      color: green;
    }
  }
}
</style>
