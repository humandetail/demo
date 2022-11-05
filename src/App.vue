<template>
  <div class="page__container">
    <nav class="page__nav">
      <ul class="page__nav-list">
        <li
          v-for="item of routes"
          :key="item.path"
          class="item"
        >
          <router-link
            :to="item.path"
            class="page__nav-link"
          >
            {{ item.meta && item.meta.title ? item.meta.title : item.name }}
          </router-link>
        </li>
      </ul>
    </nav>
    <main class="page__main">
      <router-view v-slot="{ Component, route }">
        <keep-alive>
            <component
              :is="Component"
              :key="route.fullPath"
            />
        </keep-alive>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import routes from './router/routes'
</script>

<style lang="scss" scoped>
$brand-color: #0088ff;
$bg-color: rgb(43, 45, 51);
.page__container {
  display: flex;
  gap: 16px;
  width: 100vw;
  height: 100vh;

  .page__nav {
    width: 260px;
    padding: 32px 0;
    background-color: $bg-color;

    .page__nav-link {
      display: block;
      padding: 8px 16px;
      font-size: 18px;
      font-weight: 700;
      color: #fff;
      text-decoration: none;

      &:hover:not(.router-link-exact-active) {
        text-decoration: underline;
      }

      &.router-link-exact-active {
        background-color: $brand-color;
      }
    }
  }

  .page__main {
    flex: 1
  }
}
</style>
