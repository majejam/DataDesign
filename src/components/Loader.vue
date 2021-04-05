<template>
  <div class="Loader grid grid-column">
    <img src="images/spinner.gif" alt="spinner gif" />
    <span class="cta-font Loader__message">{{ $store.getters.getLoadingMessage }}</span>
  </div>
</template>

<script>
export default {
  mou: {},
}
</script>

<style lang="scss">
.Loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 10;

  img {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }

  &__message {
    color: #ff6a71;
    margin-top: 30px;
  }
}
</style>
