<template>
  <transition name="pannel" appear mode="out-in">
    <img class="Pannel" :class="classes" src="images/ui/pannel.png" alt="Pannel image" />
  </transition>
</template>

<script>
export default {
  computed: {
    classes() {
      return [
        {
          'hue-rotate': this.$store.getters.getCurrentFestival !== 'normal',
        },
      ]
    },
  },
}
</script>

<style lang="scss">
.Pannel {
  position: absolute;
  height: auto;
  width: 20%;
  top: -10px;
  left: 50%;
  transform: translate(-50%, 0%);
}

.hue-rotate {
  filter: hue-rotate(-20deg);
}

.pannel-enter-active {
  transition: transform 0.5s cubic-bezier(0.47, 1.64, 0.41, 0.8) 2s;
}

.pannel-leave-active {
  transition: transform 0.5s ease-out 0s;
}
.pannel-enter, .pannel-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translate(-50%, -100%);
}
</style>
