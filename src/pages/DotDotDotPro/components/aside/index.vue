<template>
  <aside class="dot-pro-aside">
    <AsideGlobalState />
    <AsideItemState />
  </aside>
</template>

<script setup lang="ts">
import AsideGlobalState from './global/index.vue'
import AsideItemState from './item/index.vue'
</script>

<style lang="scss" scoped>
.dot-pro-aside {
  position: fixed;
  right: 0;
  top: 0;
  width: 320px;
  height: 100vh;
  padding: 16px;
  background-color: #fff;
  box-shadow: -2px 0 8px #eee;
}
</style>
