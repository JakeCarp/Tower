<template>
  <div class="container-fluid">
    <div class="row bg-dark">
      <div class="col-12">
        <h3>Tower</h3>
      </div>
      <div class="col-12 p-3">
        <div class="card border border-primary p-3 bg-dark">
          <h5>Get Ahead of the Scalpers.</h5>
          <h5>Reserve your spot now.</h5>
          <h5>Real events for real people.</h5>
        </div>
      </div>
      <div class="col-12">
        <div class="row justify-content-between card bg-dark">
          <div class="card-body">
            <button
              @click="getAll('all')"
              :class="
                eventFilter === 'all'
                  ? 'btn btn-primary col-2'
                  : 'btn btn-outline-primary col-2'
              "
            >
              All
            </button>
            <button
              @click="getAll('concert')"
              :class="
                eventFilter === 'concert'
                  ? 'btn btn-primary col-2'
                  : 'btn btn-outline-primary col-2'
              "
            >
              Concerts
            </button>
            <button
              @click="getAll('convention')"
              :class="
                eventFilter === 'convention'
                  ? 'btn btn-primary col-2'
                  : 'btn btn-outline-primary col-2'
              "
            >
              Conventions
            </button>
            <button
              @click="getAll('sport')"
              :class="
                eventFilter === 'sport'
                  ? 'btn btn-primary col-2'
                  : 'btn btn-outline-primary col-2'
              "
            >
              Sports
            </button>
            <button
              @click="getAll('digital')"
              :class="
                eventFilter === 'digital'
                  ? 'btn btn-primary col-2'
                  : 'btn btn-outline-primary col-2'
              "
            >
              Digital
            </button>
            <button
              @click="getAll('exhibit')"
              :class="
                eventFilter === 'exhibit'
                  ? 'btn btn-primary col-2'
                  : 'btn btn-outline-primary col-2'
              "
            >
              Exhibits
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6" v-for="e in events" :key="e.id">
        <Event :eventObj="e" />
      </div>
    </div>
    <div class="row justify-content-center">
      <Pagination />
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import Event from '../components/Event.vue'
import { onMounted } from '@vue/runtime-core'
import { eventService } from '../services/EventService'
import Pop from '../utils/Pop'
export default {

  setup() {
    onMounted(async () => {
      eventService.getAll()
    })
    return {
      eventFilter: computed(() => AppState.eventFilter),
      page: computed(() => AppState.page),
      totalPages: computed(() => AppState.totalPages),
      events: computed(() => AppState.events),
      async getAll(filter) {
        try {
          if (filter === 'all') {
            await eventService.getAll()
          } else {
            const query = '?type=' + filter
            await eventService.getAll(query)
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
  .cover-bg {
    background-image: url("https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80");
    background-position: center;
    background-size: cover;
  }
}
</style>
