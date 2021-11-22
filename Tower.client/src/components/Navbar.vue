<template>
  <div
    class="offcanvas offcanvas-end bg-dark"
    tabindex="-1"
    id="offcanvas-nav"
    aria-labelledby="offcanvasLabel"
  >
    <div class="offcanvas-header">
      <div
        class="navbar-brand text-success lighten-30 selectable"
        @click="routeTo('home')"
      >
        Tower
      </div>
      <button
        type="button"
        class="btn-close btn-close-white text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="my-2 my-lg-0 px-3" v-if="user.isAuthenticated">
      <div class="selectable">
        <img :src="user.picture" alt="user photo" height="40" class="rounded" />
        <span class="mx-3 text-success lighten-30">{{ user.name }}</span>
      </div>
    </div>
    <div class="offcanvas-body">
      <ul class="navbar-nav me-auto">
        <li>
          <button
            @click="routeTo('about')"
            class="btn text-success lighten-30 selectable text-uppercase"
          >
            About
          </button>
        </li>
        <li v-if="user.isAuthenticated">
          <button
            class="btn text-success lighten-30 selectable text-uppercase"
            data-bs-toggle="modal"
            data-bs-target="#createEventModal"
          >
            Create Event
          </button>
        </li>
        <li v-if="user.isAuthenticated">
          <button
            @click="routeTo('account')"
            class="btn text-success lighten-30 selectable text-uppercase"
          >
            Manage Account
          </button>
        </li>
        <li>
          <button
            class="
              btn
              selectable
              text-success
              lighten-30
              text-uppercase
              my-2 my-lg-0
            "
            @click="login"
            v-if="!user.isAuthenticated"
          >
            Login
          </button>
          <button
            v-else
            class="
              btn
              selectable
              text-success
              lighten-30
              text-uppercase
              my-2 my-lg-0
              text-danger
            "
            @click="logout"
          >
            <i class="mdi mdi-logout"></i>
            logout
          </button>
        </li>
      </ul>
    </div>
  </div>
  <CreateEvent />
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Offcanvas } from 'bootstrap'
export default {
  setup() {
    const router = useRouter()
    return {
      router,
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async routeTo(routeStr) {
        Offcanvas.getOrCreateInstance(document.getElementById('offcanvas-nav')).toggle()
        if (routeStr == 'about') {
          router.push({
            name: 'About'
          })
        } else if (routeStr == 'home') {
          router.push({
            name: 'Home'
          })
        } else {
          router.push({
            name: 'Account'
          })
        }
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
