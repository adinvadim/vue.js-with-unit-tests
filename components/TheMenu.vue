<template>
  <div class="the-menu">
    <button class="the-menu__button" @click="turnVisible(!isVisible)">
      Menu
    </button>
    <div class="hide-md-up">
      <nav class="the-menu__nav" v-if="isVisible">
        <mobile-column
          :items="data"
          :value="activeItems[0]"
          :key="0"
          @input="setActive(0, $event)"/>
        <mobile-column
          v-for="(item, index) in activeItemsWithSubMenu"
          :items="item.submenu"
          :key="index + 1"
          :value="activeItems[index + 1]"
          :parent-item="activeItemsWithSubMenu[index]"
          @input="setActive(index + 1, $event)"
          @back="activeItems.pop()"
        />
      </nav>
    </div>
   <div class="hide-md-down">
    <nav class="the-menu__nav" v-if="isVisible">
      <column
        :items="data"
        :value="activeItems[0]"
        :key="0"
        @input="setActive(0, $event)"/>
      <column
        v-for="(item, index) in activeItemsWithSubMenu"
        :items="item.submenu"
        :key="index + 1"
        :value="activeItems[index + 1]"
        :parent-item="activeItemsWithSubMenu[index]"
        @input="setActive(index + 1, $event)"
      />
    </nav>
   </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Column from './Column.vue';
import MobileColumn from './MobileColumn.vue';

export default {
  components: {
    Column,
    MobileColumn,
  },
  data() {
    return {
      activeItems: [],
    };
  },
  computed: {
    ...mapState({
      data: state => state.the_menu.menu,
      isVisible: state => state.the_menu.isVisible,
    }),
    activeItemsWithSubMenu() {
      return this.activeItems.filter(item => item && item.submenu != null);
    },
  },
  methods: {
    ...mapMutations({
      turnVisible: 'the_menu/TURN_VISIBLE',
    }),

    setActive(index, item) {
      this.activeItems.splice(index, this.activeItems.length, item);
    },
  },
  watch: {
    isVisible(value) {
      if (!value) {
        this.activeItems = [];
      }
    }
  }
};
</script>


<style lang="scss">
.the-menu {
  &__nav {
    display: flex;
    color: black;
    position: fixed;
    z-index: 8;
    width: 100%;
    height: 100%;
    left: 0;
    max-width: 1440px;
    margin-right: auto;
    margin-left: auto;
    overflow: hidden;
  }
}
</style>
