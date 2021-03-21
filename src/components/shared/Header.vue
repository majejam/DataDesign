<template>
  <header>
    <button @click.prevent="logout">Sign out ({{ this.$store.getters.getUser.display_name }})</button>
    <button @click.prevent="refresh">Refresh</button>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logoutUser')
    },
    refresh() {
      this.$store.dispatch('initPersonalization')
    },
  },
}
</script>

<style></style>
