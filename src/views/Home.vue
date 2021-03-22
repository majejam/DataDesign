<template>
  <div>
    <div class="renderer" ref="renderer"></div>
    <Header />
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

export default {
  components: { Header },
  name: 'Home',
  mounted() {
    new Player()
    setTimeout(() => {
      Engine.init(this.$refs.renderer)
    }, 2000)
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
