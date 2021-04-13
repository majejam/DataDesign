<template>
  <transition name="pannel" appear mode="out-in">
    <div :key="$store.getters.getCurrentFestival" class="Pannel">
      <button v-if="$store.getters.getCurrentFestival !== 'recommended'" @click.prevent="recommendedConcert">
        <img src="images/ui/discover_world.png" alt="Pannel image" />
      </button>
      <button v-if="$store.getters.getCurrentFestival !== 'normal'" @click.prevent="yourFestival">
        <img :class="classes" src="images/ui/your_festival.png" alt="Pannel image" />
      </button>
    </div>
  </transition>
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
    yourFestival() {
      this.$store.dispatch('getUserTopTracks')
    },
  },
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
  width: auto;
  top: -10px;
  left: 50%;
  transform: translate(-50%, 0%);
  cursor: pointer;

  button {
    cursor: pointer;
  }

  @include media('<md') {
    display: none;
  }
}

.hue-rotate {
  filter: hue-rotate(-20deg);
}

.pannel-enter-active {
  transition: opacity 0.5s ease-out 2s;
  button {
    transition: transform 0.5s cubic-bezier(0.47, 1.64, 0.41, 0.8) 2s;
  }
}

.pannel-leave-active {
  transition: opacity 0.5s ease-out 2s;
  button {
    transition: transform 0.5s ease-out 0s;
  }
}
.pannel-enter, .pannel-leave-to /* .fade-leave-active below version 2.1.8 */ {
  button {
    transform: translate(0%, -100%);
  }
}
</style>
