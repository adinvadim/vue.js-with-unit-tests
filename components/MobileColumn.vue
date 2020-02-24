<template>
  <ul class="mobile-column">
    <li class="mobile-column__item_back" v-if="parentItem != null">
      <a class="mobile-column__link" @click.prevent="$emit('back')">
        Назад
      </a>
    </li>
    <li
      class="mobile-column__item"
      v-for="item in items" :key="item.id"
    >
      <a
        class="mobile-column__link"
        :href="itemSlug(item)"
        @click="handleClick($event, item)">
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
    handleClick($event, item) {
      if (item.submenu) {
        $event.preventDefault();
        this.$emit('input', {
          ...item,
          path: this.itemSlug(item),
        })
      }
    }
  },
};
</script>

<style lang="scss">
.mobile-column {
  display: none;
  flex-direction: column;
  position: relative;
  width: 100%;
  padding-left: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  font-size: .875rem;
  list-style-type: none;
  background: #fff;
  z-index: 7;

  &:last-child {
    display: flex;
  }

  &__item {
    display: block;
    width: 100%;
    color: #25353c;
    cursor: pointer;
    border-top: 1px solid #e3e3e3;
    -webkit-tap-highlight-color: transparent;
    &:first-child {
      border-top: 1px solid #e3e3e3;
    }
    &_back {
      font-weight: bold;
    }
  }
  &__link {
    display: block;
    width: 100%;
    padding: 11px 15px;
    line-height: 1;
    color: inherit;
    text-align: left;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }
}
</style>
