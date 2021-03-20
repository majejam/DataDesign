<template>
  <div>
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
  {{ this.$store.getters.getTopTracks }}

  </pre
    >
  </div>
</template>

<script>
import Header from '@/components/shared/Header.vue'

export default {
  components: { Header },
  name: 'Home',
}
</script>

<style lang="scss">
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
