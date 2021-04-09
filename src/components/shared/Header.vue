<template>
  <header>
    <button @click.prevent="logout">Sign out ({{ this.$store.getters.getUser.display_name }})</button>
    <button @click.prevent="refresh">Refresh</button>
    <button @click.prevent="refreshToken">Refresh Token</button>
    <button v-if="$store.getters.getCurrentFestival !== 'recommended'" @click.prevent="recommendedConcert">Go to recommended festival</button>
    <button v-if="$store.getters.getCurrentFestival !== 'normal'" @click.prevent="yourFestival">Go to your festival</button>
    $<button v-if="$store.getters.getCurrentFestival !== 'normal'" @click.prevent="recommendedConcert">Re-seed recommendation</button>
    <span>{{ $store.getters.getCurrentFestival }}</span>
  </header>
</template>

<script>
import Chance from 'chance'
export default {
  methods: {
    logout() {
      this.$store.dispatch('logoutUser')
    },
    refresh() {
      this.$store.dispatch('initPersonalization')
    },
    refreshToken() {
      this.$store.dispatch('refreshToken')
    },
    recommendedConcert() {
      const chance = new Chance()
      const ids = chance.pickset(this.$store.getters.getTopIds, 5)
      this.$store.dispatch('getRecommendation', ids.toString())
    },
    yourFestival() {
      this.$store.dispatch('getUserTopTracks')
    },
  },
}
</script>

<style></style>
