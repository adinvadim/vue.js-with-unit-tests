<template>
  <ul class="column">
    <li
      class="column__item"
      :class="{
        'column__item_active': value && value.id === item.id,
      }"
      v-for="item in items" :key="item.id"
      @mouseenter="handleMouseEnter(item)"
      @mouseleave="handleMouseLeave"
    >
      <a class="column__link" :href="itemSlug(item)" @click="handleClick($event, item)">
        {{ item.name }}
      </a>
    </li>
  </ul>
</template>

<script>
import pathJoin from '@/utils/pathJoin';
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    value: {
      required: true,
      validator: prop => typeof prop === 'object' || prop == null,
    },
    parentItem: {
      default: null,
      validator: prop => typeof prop === 'object' || prop == null,
    }
  },
  data() {
    return {
      timeoutId: null,
    }
  },
  methods: {
    itemSlug(item) {
      const parentSlug = this.parentItem != null ? `/${this.parentItem.path}/` : '/catalog/'
      return pathJoin([parentSlug, item.slug]);
    },
    handleMouseEnter(item) {
      this.timeoutId = setTimeout(() => {
        this.$emit('input', {
          ...item,
          path: this.itemSlug(item),
        });
      }, 300);
    },

    handleMouseLeave() {
      clearTimeout(this.timeoutId);
    },

    handleClick($event, item) {
      if (item.submenu) {
        $event.preventDefault();
        this.$emit('input', {
          ...item,
          path: this.itemSlug(item),
        });
      }
    }

  },
};
</script>

<style lang="scss">
.column {
  max-width: 360px;
  width: 100%;
  max-height: 100%;
  padding: 12px 0;
  overflow-y: auto;
  list-style: none;
  pointer-events: all;
  background-color: #fff;
  &__item {
    display: block;
    width: 100%;
    &_active, &:hover {
      color: #fff;
      background-color: #8200ff;
    }
  }
  &__link {
    display: block;
    width: 100%;
    padding: 8px 30px;
    color: inherit;
    &:hover {
      color: white;
    }
  }
}
</style>
