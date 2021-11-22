<template>
  <header class="container-fluid sticky-top">
    <div class="justify-content-end">
      <button
        title="navigation menu"
        aria-describedby="navigation menu"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvas-nav"
        class="btn btn-primary nav-button m-3"
      >
        <i class="mdi mdi-menu"></i>
      </button>
    </div>
    <Navbar />
  </header>
  <main class="bg-dark">
    <router-view />
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4"></div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
