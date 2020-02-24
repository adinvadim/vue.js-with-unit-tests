<template>
  <section class="container">
    <h1 class="visually-hidden">
      ГдеМатериал.Ру
    </h1>
    <PageHeader />
    <nuxt />
    <PageFooter />
  </section>
</template>

<script>
import { mapState } from 'vuex';
import PageHeader from '~/components/PageHeader.vue';
import PageFooter from '~/components/PageFooter.vue';

export default {
  components: {
    PageHeader,
    PageFooter,
  },
  computed: {
    ...mapState({
      isVisible: state => state.the_menu.isVisible,
    }),
  },
  watch: {
    isVisible(value) {
      if (value) {
        document.body.classList.add('body-hidden');
      } else {
        document.body.classList.remove('body-hidden');
      }
    }
  }
};
</script>

<style lang="scss">
@import "~assets/base.scss";
</style>
