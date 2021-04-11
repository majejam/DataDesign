<template>
  <transition name="appear" appear mode="out-in">
    <div class="Menu" :class="classes">
      <button class="Menu__container grid" @click="toggle">
        <span class="Menu__title ui-font">Menu</span>
        <img class="Menu__caret" src="images/caret.svg" alt="caret icon" />
      </button>
      <button v-if="$store.getters.getCurrentFestival !== 'normal'" class="Menu__container Menu__shuffle grid grid-nowrap" @click="recommendedConcert">
        <span class="Menu__title ui-font">New Discovery World</span>
        <img class="Menu__star" src="images/star.svg" alt="caret icon" />
      </button>
      <div class="Menu__dropdown grid grid-column grid-end">
        <button v-if="!demo && $store.getters.getCurrentFestival !== 'normal'" class="ui-font ui-btn-mobile grid grid-nowrap" @click.prevent="recommendedConcert">
          New discovery world <img class="Menu__dropdown__signout__icon" src="images/star.svg" alt="logout icon" />
        </button>
        <div v-if="!demo" class="Menu__dropdown__volume">
          <label for="volume" class="ui-font">Volume</label>
          <input type="range" step="0.1" id="volume" name="volume" :value="volume" @change="setVolume" min="0" max="1" />
        </div>
        <Debug v-if="!demo" />
        <div class="Menu__dropdown__signout">
          <button v-if="!demo" class="ui-font grid grid-nowrap" @click.prevent="logout">
            Sign out (<span class="Menu__troncate">{{ this.$store.getters.getUser.display_name }}</span
            >) <img class="Menu__dropdown__signout__icon" src="images/logout.svg" alt="logout icon" />
          </button>
          <router-link v-if="demo" class="ui-font grid grid-nowrap" to="/">Exit demo <img class="Menu__dropdown__signout__icon" src="images/logout.svg" alt="logout icon" /> </router-link>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Bus from '@/utils/bus.js'
import Player from '@/GL/Player.js'
import Debug from '@/components/UI/Debug.vue'
import Chance from 'chance'
export default {
  components: { Debug },
  props: {
    song: {
      type: Object,
    },
    demo: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
      volume: this.$store.getters.getVolume,
      targetVolume: 0,
    }
  },
  mounted() {
    Bus.$on('grabbing', _e => {
      if (_e) this.isOpen = false
    })
  },
  methods: {
    logout() {
      this.$store.dispatch('logoutUser')
    },
    recommendedConcert() {
      const chance = new Chance()
      const ids = chance.pickset(this.$store.getters.getTopIds, 5)
      this.$store.dispatch('getRecommendation', ids.toString())
    },
    setVolume(_e) {
      this.volume = parseFloat(_e.target.value)
      Player.setGlobalVolume(parseFloat(this.volume))
    },
    toggle() {
      this.isOpen = !this.isOpen
    },
  },
  computed: {
    classes() {
      return [
        {
          'Menu--open': this.isOpen,
        },
      ]
    },
  },
}
</script>

<style lang="scss">
.Menu {
  position: absolute;
  top: 40px;
  right: 50px;
  opacity: 1;

  &__container {
    height: 48px;
    background: var(--primary-base);
    border-radius: 8px;
    padding: 0 16px;
    text-decoration: none;
    cursor: pointer !important;
  }

  &__item {
    margin-bottom: 16px;
    cursor: pointer;
  }

  &__troncate {
    max-width: 140px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__title {
    color: var(--neutral-white);
    font-family: var(--font-secondary);
    font-size: rem(14px);
    font-weight: 500;
    line-height: rem(42px);
    letter-spacing: 0em;
    margin-right: 8px;
  }

  &__shuffle {
    position: absolute;
    white-space: nowrap;
    top: 0;
    right: calc(100% + 8px);

    @include media('<sm') {
      display: none !important;
    }
  }

  &__dropdown {
    position: absolute;
    color: var(--neutral-white);
    top: calc(100% + 8px);
    padding: 16px;
    background: var(--primary-base);
    border-radius: 8px;
    right: 0;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.2s ease-in 0s;
    pointer-events: none;

    @include media('<sm') {
      width: 80vw;
    }

    &__volume {
      margin-bottom: 16px;
      input {
        cursor: pointer;
        -webkit-appearance: none;
        vertical-align: middle;
        border: none;
        padding: 0 0 0 8px;
        width: 72px;
        background: none;

        &::-webkit-slider-runnable-track {
          background-color: var(--neutral-white);
          height: 4px;
          border-radius: 2px;
        }

        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          border-radius: 100%;
          background-color: var(--neutral-white);
          height: 14px;
          width: 14px;
          margin-top: -5px;
        }
      }
    }

    &__signout {
      button {
        cursor: pointer;
      }

      a {
        text-decoration: none;
      }

      &__icon {
        margin-left: 8px;
      }
    }
  }

  &--open {
    .Menu__dropdown {
      opacity: 1;
      pointer-events: all;
    }

    .Menu__caret {
      transform: rotate(-180deg);
    }
  }

  .ui-btn-mobile {
    display: none;
    padding: 0 0 10px 0;

    @include media('<sm') {
      display: flex;
    }
  }

  @include media('<sm') {
    right: 10%;
  }
}

.appear-enter-active,
.appear-leave-active {
  transition: opacity 0.5s ease-in 0s;
}
.appear-enter, .appear-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
