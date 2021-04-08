<template>
  <transition name="appear" appear mode="out-in">
    <div class="Loader grid grid-column">
      <img class="Loader__bg Loader__image" src="images/loader.svg" alt="svg" />
      <img class="Loader__bg Loader__image_back" src="images/loader.svg" alt="svg" />
      <div class="Loader__card grid">
        <img src="images/logo.svg" alt="logo festivaly" />
      </div>
      <span class="cta-font Loader__message" v-show="false">{{ $store.getters.getLoadingMessage }}</span>
    </div>
  </transition>
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
  overflow: hidden;

  &__image {
    animation: 30s linear 0s slidein infinite;

    &_back {
      animation: 30s linear 0s slideInAfter infinite;
    }
  }

  &__bg {
    position: absolute;
    left: -100%;
    height: 200vh;
    object-fit: cover;
    will-change: transform;
  }

  &__card {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 300px;
    width: 300px;
    transform: translate(-50%, -50%);
    z-index: 15;
    background: var(--neutral-white);
    padding: 40px;
    transition: ease-in-out 0.3s 0.3s opacity;
    border: solid 10px var(--primary-base);

    @include media('<md') {
      height: 164px;
      width: 164px;
      border: solid 8px var(--primary-base);
    }

    img {
      width: 100%;
    }
  }

  @keyframes slidein {
    0% {
      transform: translate(0%, 0%);
    }
    45% {
      opacity: 1;
    }
    49% {
      transform: translate(-20%, -100%);
    }
    50% {
      transform: translate(-20%, -100%);
      opacity: 0;
    }

    51% {
      transform: translate(20%, 100%);
    }

    55% {
      opacity: 1;
    }

    100% {
      transform: translate(0%, 0%);
    }
  }

  @keyframes slideInAfter {
    0% {
      transform: translate(20%, 102%);
      opacity: 0;
    }

    5% {
      opacity: 1;
    }

    10% {
      opacity: 1;
    }

    50% {
      transform: translate(0%, 0%);
      opacity: 1;
    }

    90% {
      opacity: 1;
    }

    95% {
      opacity: 0;
    }

    99% {
      transform: translate(-20%, -98%);
    }

    100% {
      transform: translate(-20%, 102%);
      opacity: 0;
    }
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

.appear-enter-active,
.appear-leave-active {
  transition: opacity 0.5s ease-in 1s;
}
.appear-enter, .appear-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  .Loader__card {
    opacity: 0;
  }
}
</style>
