<template>

<header>
  <button @click.prevent="logout">
      Sign out ({{this.$store.getters.getUser.display_name}})
  </button>
</header>
</template>

<script>
  export default {
    methods: {
      logout() {
        this.$store.dispatch("logoutUser")
      }
    },
  }
</script>

<style>
</style>
