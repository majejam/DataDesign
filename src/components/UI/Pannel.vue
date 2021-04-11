<template>
  <transition name="pannel" appear mode="out-in">
    <img class="Pannel" src="images/ui/pannel.png" alt="Pannel image" />
  </transition>
</template>

<script>
export default {
  props: {
    song: {
      type: String,
    },
  },
  methods: {},
}
</script>

<style lang="scss">
.Pannel {
  position: absolute;
  height: auto;
  width: 20%;
  top: 0px;
  left: 50%;
  transform: translate(-50%, 0%);
}

.pannel-enter-active,
.pannel-leave-active {
  transition: transform 0.5s cubic-bezier(0.47, 1.64, 0.41, 0.8) 1.5s;
}
.pannel-enter, .pannel-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translate(-50%, -100%);
}
</style>
