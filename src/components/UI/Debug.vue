<template>
  <div class="grid grid-column grid-end">
    <button class="ui-font Menu__item" @click.prevent="refresh">Reload (debug)</button>
    <button class="ui-font Menu__item" @click.prevent="refreshToken">Refresh Token (debug)</button>
    <button class="ui-font Menu__item" v-if="$store.getters.getCurrentFestival !== 'recommended'" @click.prevent="recommendedConcert">Recommended festival (debug)</button>
    <button class="ui-font Menu__item" v-if="$store.getters.getCurrentFestival !== 'normal'" @click.prevent="yourFestival">Go to your festival (debug)</button>
    <button class="ui-font Menu__item" v-if="$store.getters.getCurrentFestival !== 'normal'" @click.prevent="recommendedConcert">Re-seed recommendation (debug)</button>
  </div>
</template>

<script>
import Chance from 'chance'
export default {
  methods: {
    recommendedConcert() {
      const chance = new Chance()
      const ids = chance.pickset(this.$store.getters.getTopIds, 5)
      this.$store.dispatch('getRecommendation', ids.toString())
    },
    refresh() {
      this.$store.dispatch('initPersonalization')
    },
    refreshToken() {
      this.$store.dispatch('refreshToken')
    },
    yourFestival() {
      this.$store.dispatch('getUserTopTracks')
    },
  },
}
</script>

<style></style>
