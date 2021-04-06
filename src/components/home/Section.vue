<template>
  <div class="Section grid grid-column grid-start" :class="classes">
    <h2 class="Section__title section-title">{{ title }}</h2>
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

  &__title {
    margin-bottom: 24px;
  }

  &--right {
    margin-left: auto;
  }
}
</style>
