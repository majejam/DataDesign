<template>
  <div>
    <Signup v-if="!$store.getters.isAuthenticated" />
    <Festival v-if="$store.getters.isAuthenticated" />
  </div>
</template>

<script>
import Festival from '@/views/Festival.vue'
import Signup from '@/views/Signup.vue'

export default {
  components: { Festival, Signup },
  name: 'Home',
}
</script>

<style lang="scss"></style>
