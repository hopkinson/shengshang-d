<!-- 顶部高度 -->
<style lang="scss" scoped>
@import "src/js/css/base";
.cs-status__navBar {
  background-color: $base-color;
}
</style>
<template>
<div class="cs-status__navBar" :style="{'height': statusBarHeight}">
</div>
</template>
<script>
export default {
  data: () => ({
    statusBarHeight: weex.config.eros.statusBarHeight
      ? weex.config.eros.statusBarHeight
      : 40
  }),
  created() {
  },
  methods: {},
  components: {}
};
</script>
