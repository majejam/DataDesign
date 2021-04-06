<template>
  <button :class="['Button', { 'Button--primary': primary, 'Button--secondary': secondary }]" type="submit">
    <span class="Button__content"><slot></slot></span>
  </button>
</template>
<script>
export default {
  props: {
    primary: {
      type: Boolean,
    },
    secondary: {
      type: Boolean,
    },
  },
}
</script>
<style lang="scss">
.Button {
  font-family: var(--font-secondary);
  font-weight: 600;
  height: 60px;
  min-width: 288px;
  color: inherit;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  will-change: background-color;
  cursor: pointer;

  &--primary {
    color: white;
    background-color: #ff6a71;
  }

  &--secondary {
    color: white;
    border: 1px solid white;
  }

  &__content {
    text-decoration: none;
  }

  .demo-link {
    text-decoration: none;
    color: white;
  }
}
</style>
