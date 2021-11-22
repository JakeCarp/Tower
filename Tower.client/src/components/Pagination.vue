<template>
  <div
    v-if="page && totalPages"
    class="pagination p-3 col-6 justify-content-center"
  >
    <div class="row">
      <div class="col-2 p-0">
        <button
          :class="page === 1 ? 'disabled btn btn-dark' : 'btn btn-dark'"
          title="First Page"
          aria-describedby="first page of events"
          @click="getEvents(1)"
        >
          First
        </button>
      </div>
      <div class="col">
        <span
          v-for="n in totalPages"
          :key="n"
          :class="page === n.toString() ? 'm-1 bg-primary' : 'm-1 selectable'"
          @click="getEvents(n)"
          >{{ n }}</span
        >
      </div>
      <div class="col-2 p-0">
        <button
          :class="
            page === totalPages ? 'disabled btn btn-dark' : 'btn btn-dark'
          "
          title="Last Page"
          aria-describedby="last page of events"
          @click="getEvents(totalPages)"
        >
          Last
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { eventService } from '../services/EventService'
import Pop from '../utils/Pop'
export default {
  setup() {
    return {
      page: computed(() => AppState.page),
      totalPages: computed(() => AppState.totalPages),
      async getEvents(page) {
        try {
          const query = `?page=${page}`
          await eventService.getAll(query)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>