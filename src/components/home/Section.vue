<template>
  <div class="Section grid grid-column grid-start" :class="classes">
    <h2 class="Section__title section-title">{{ title }}</h2>
    <img class="Section__image" src="images/home/home_03.png" alt="Festivaly illustration" />
    <p class="Section__description section-description" v-html="description"></p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    right: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return [
        {
          'Section--right': this.right,
        },
      ]
    },
  },
}
</script>

<style lang="scss">
.Section {
  width: 50%;
  margin: 70px 0;
  color: white;

  @include media('<sm') {
    width: 100%;
    margin: 0;
  }

  &__title {
    margin-bottom: 24px;
  }

  &__image {
    width: 100%;
    height: auto;
    @include media('>sm') {
      display: none;
    }
  }

  &--right {
    margin-left: auto;
  }
}
</style>
