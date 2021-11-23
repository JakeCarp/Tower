<template>
  <div
    class="modal fade text-dark"
    id="createEventModal"
    tabindex="-1"
    aria-labelledby="create event modal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createEventModalLabel">New Event</h5>
          <button
            title="close"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form id="eventForm" @submit.prevent="create" class="row">
            <div class="mb-3 col-12">
              <label for="eventName" class="form-label">Event Name</label>
              <input
                required
                aria-describedby="event name input"
                v-model="eventData.name"
                type="text"
                class="form-control"
                id="eventName"
                placeholder="Name..."
              />
            </div>
            <div class="mb-3 col-12">
              <label for="eventDesc" class="form-label">Description</label>
              <textarea
                required
                v-model="eventData.description"
                aria-describedby="event description input"
                class="form-control"
                id="eventDesc"
                rows="3"
              ></textarea>
            </div>
            <div class="mb-3 col-12">
              <label for="CoverImg" class="form-label">Cover Image (URL)</label>
              <input
                required
                aria-describedby="event cover image input"
                v-model="eventData.coverImg"
                type="text"
                class="form-control"
                id="coverImg"
                placeholder="URL..."
              />
            </div>
            <div class="mb-3 col-12">
              <label for="eventLocation" class="form-label">Location</label>
              <input
                required
                aria-describedby="event location input"
                v-model="eventData.location"
                type="text"
                class="form-control"
                id="eventLocation"
                placeholder="Location..."
              />
            </div>
            <div class="mb-3 col-6">
              <label for="eventCapacity" class="form-label">Capacity</label>
              <input
                required
                aria-describedby="event capacity input"
                v-model="eventData.capacity"
                type="number"
                min="0"
                placeholder="1"
                class="form-control"
                id="eventCapacity"
              />
            </div>
            <div class="mb-3 col-6">
              <label for="eventDate" class="form-label">Start Date</label>
              <input
                required
                aria-describedby="event date input"
                v-model="eventData.startDate"
                type="date"
                class="form-control"
                id="eventDate"
              />
            </div>
            <div class="input-group mb-3">
              <label class="input-group-text" for="inputGroupSelect01"
                >Type</label
              >
              <select
                required
                v-model="eventData.type"
                class="form-select"
                id="inputGroupSelect01"
              >
                <option selected>Choose...</option>
                <option value="concert">Concert</option>
                <option value="convention">Convention</option>
                <option value="sport">Sport</option>
                <option value="digital">Digital</option>
                <option value="exhibit">Exhibit</option>
              </select>
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Create Event
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'
import { eventService } from '../services/EventService'
import Pop from '../utils/Pop'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { Modal } from 'bootstrap'
import { logger } from '../utils/Logger'
export default {
  props: {
    eventObj: {
      type: Object
    }
  },
  setup(props) {
    const router = useRouter()
    const eventData = ref({})
    watchEffect(() => {
      eventData.value = { ...props.eventObj }
    })
    return {
      router,
      eventData,
      async create() {
        try {
          const event = await eventService.createEvent(eventData.value)
          Pop.toast('Event Created', 'success')
          router.push({
            name: 'Event',
            params: {
              id: event.id
            }
          })
          eventData = {}
          const modalElem = document.getElementById('createEventModal')
          Modal.getOrCreateInstance(modalElem).toggle()
          Offcanvas.getOrCreateInstance(document.getElementById('offcanvas-nav')).toggle()
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>