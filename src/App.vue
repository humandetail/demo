<template>
  <div
    class="page__container"
    :style="`--gap: ${isActive ? 16 : 64}px`"
  >
    <div
      class="hamburger hamburger--emphatic-r"
      :class="isActive ? 'is-active' : ''"
      :style="`--color: ${isActive ? '#fff' : '#000'}`"
      @click="isActive = !isActive"
    >
      <div class="hamburger-box">
        <div class="hamburger-inner"></div>
      </div>
    </div>

    <nav
      class="page__nav"
      :style="{
        width: isActive ? '260px' : '1px'
      }"
    >
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

const isActive = ref(false)
</script>

<style lang="scss" scoped>
$brand-color: #0088ff;
$bg-color: rgb(43, 45, 51);
.page__container {
  display: flex;
  position: relative;
  gap: var(--gap, 16px);
  width: 100vw;
  height: 100vh;

  .hamburger {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    margin: 0;
    padding: 15px 15px;
    color: var(--color);
    text-transform: none;
    border: 0;
    background-color: transparent;
    transition-property: opacity, filter;
    transition-duration: 0.15s;
    transition-timing-function: linear;
    overflow: visible;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
    &.is-active {
      &:hover {
        opacity: 0.7;
      }
      .hamburger-inner,
      .hamburger-inner::before,
      .hamburger-inner::after {
        background-color: var(--color);
      }
    }

    .hamburger-box {
      width: 40px;
      height: 24px;
      display: inline-block;
      position: relative;
    }

    .hamburger-inner,
    .hamburger-inner::before,
    .hamburger-inner::after {
      width: 40px;
      height: 4px;
      background-color: var(--color);
      border-radius: 4px;
      position: absolute;
      transition-property: transform;
      transition-duration: 0.15s;
      transition-timing-function: ease;
    }

    .hamburger-inner {
      display: block;
      top: 50%;
      margin-top: -2px;

      &::before,
      &::after {
        content: "";
        display: block;
      }

      &::before {
        top: -10px;
      }

      &::after {
        bottom: -10px;
      }
    }

    &.hamburger--emphatic-r {
      overflow: hidden;
      .hamburger-inner {
        transition: background-color 0.125s 0.175s ease-in;

        &::before {
          left: 0;
          transition: transform 0.125s cubic-bezier(0.6, 0.04, 0.98, 0.335), top 0.05s 0.125s linear, left 0.125s 0.175s ease-in;
        }

        &::after {
          top: 10px;
          right: 0;
          transition: transform 0.125s cubic-bezier(0.6, 0.04, 0.98, 0.335), top 0.05s 0.125s linear, right 0.125s 0.175s ease-in;
        }
      }

      &.is-active {
        .hamburger-inner {
          transition-delay: 0s;
          transition-timing-function: ease-out;
          background-color: transparent !important;

          &::before {
            left: -80px;
            top: 80px;
            transform: translate3d(80px, -80px, 0) rotate(-45deg);
            transition: left 0.125s ease-out, top 0.05s 0.125s linear, transform 0.125s 0.175s cubic-bezier(0.075, 0.82, 0.165, 1);
          }

          &::after {
            right: -80px;
            top: 80px;
            transform: translate3d(-80px, -80px, 0) rotate(45deg);
            transition: right 0.125s ease-out, top 0.05s 0.125s linear, transform 0.125s 0.175s cubic-bezier(0.075, 0.82, 0.165, 1);
          }
        }
      }
    }
  }

  .page__nav {
    width: 260px;
    padding: 96px 0 32px 0;
    background-color: $bg-color;
    overflow: hidden;
    transition: width .3s cubic-bezier(0.075, 0.82, 0.165, 1);

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
    flex: 1;
    min-width: 0;
  }
}
</style>
