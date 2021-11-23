<template>
  <header class="container-fluid sticky-top bg-dark">
    <div class="col-12 pt-3 ps-3">
      <router-link :to="{ name: 'Home' }">
        <h3>Tower</h3>
      </router-link>
    </div>
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
    <div class="bg-dark text-light text-center p-4">FOOTER</div>
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
