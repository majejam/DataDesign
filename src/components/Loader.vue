<template>
  <div class="Loader grid grid-column">
    <img class="Loader__spinner" src="images/spinner.gif" alt="spinner gif" />
    <img class="Loader__image" src="images/loader.svg" alt="svg gif" />
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
  background: linear-gradient(180deg, #ff666f 0%, #f8ae84 50%, #fec961 100%);
  z-index: 10;

  &__image {
    position: absolute;
    top: 0;
    left: 0;
  }

  &__spinner {
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
