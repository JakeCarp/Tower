<template>
  <div class="eventDetails container-fluid">
    <div class="row my-3">
      <div class="col-6 img-container">
        <img
          class="img-fluid"
          :src="eventObj.coverImg"
          alt="cover Image"
          aria-describedby="event cover image"
        />
      </div>
      <div class="col-6 card bg-dark border border-primary pt-3">
        <div class="row justify-content-between align-items-center mb-3">
          <div class="col-6">
            <h3>{{ eventObj.name }}</h3>
            <p>Location: {{ eventObj.location }}</p>
          </div>
          <div class="col-6">
            <p>Start Date: {{ eventObj.startDate }}</p>
          </div>
        </div>
        <div class="col-12">
          <h4>Description:</h4>
          <p>{{ eventObj.description }}</p>
        </div>
        <div class="col-12">
          <div class="row p-3">
            <button
              @click="toggleAttend()"
              v-if="!accountAttendance.find((a) => a.eventId === eventObj.id)"
              class="btn btn-outline-success lighten-30"
            >
              Attend <i class="mdi mdi-human"></i>
            </button>
            <button
              @click="
                toggleAttend(
                  accountAttendance.find((a) => a.eventId === eventObj.id).id
                )
              "
              v-else
              class="btn btn-outline-warning lighten-30"
            >
              Cancel Attendance <i class="mdi mdi-human"></i>
            </button>
            <p class="text-center mt-3">Spots Left: {{ eventObj.capacity }}</p>
          </div>
        </div>
        <div class="col-12">
          <button class="btn btn-outline-danger" @click="cancelEvent">
            Cancel Event
          </button>
          <button
            class="btn btn-outline-warning ms-4"
            data-bs-toggle="modal"
            data-bs-target="#createEventModal"
          >
            Edit Event
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 card bg-dark border border-primary">
        <div class="p-2">
          <img
            v-for="a in attendees"
            :key="a.id"
            class="img-fluid rounded-circle attendee-pic"
            :src="a.picture"
            :title="a.name"
          />
        </div>
      </div>
    </div>
    <div class="row justify-content-center mt-5">
      <div class="col-12 card bg-dark border border-primary">
        <div class="card-header">
          <h3>Comments</h3>
        </div>
        <div class="card-body">
          <div class="input-group d-flex justify-content-center">
            <textarea
              class="border-primary"
              v-model="commentData"
              rows="2"
              cols="45"
              maxlength="50"
            ></textarea>
            <span
              title="Send Comment"
              aria-describedby="send comment"
              @click="createComment"
              class="input-group-text bg-dark"
              ><i class="mdi mdi-send"></i
            ></span>
          </div>
          <div class="col-12">
            <div class="row">
              <div
                v-for="c in comments"
                :key="c.id"
                class="col-12 my-3 card text-dark"
              >
                <div class="row justify-content-between">
                  <div class="col-1 ps-2 pt-2 pe-0">
                    <img
                      class="img-fluid rounded-circle attendee-pic"
                      :src="c.creator.picture"
                      title="profile picture"
                    />
                  </div>
                  <div class="col-8 pt-2 ps-0">
                    <p class="m-0">{{ c.creator.name }}</p>
                  </div>
                  <div class="col-1">
                    <i
                      @click="removeComment(c.id)"
                      class="mdi mdi-trash-can text-danger selectable"
                    ></i>
                  </div>
                  <div class="col-12 text-center">
                    <p>{{ c.body }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState'
import { onMounted, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { eventService } from '../services/EventService'
import { attendeesService } from '../services/AttendeesService'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { commentsService } from '../services/CommentsService'
export default {
  setup() {
    const commentData = ref('')
    const route = useRoute()
    onMounted(async () => {
      await eventService.getAttendees(route.params.id)
      await eventService.getComments(route.params.id)
    })
    watchEffect(async () => {
      if (route.name == "Event") {
        await eventService.getById(route.params.id)
        await eventService.getAttendees(route.params.id)
        await eventService.getComments(route.params.id)
      }
    })
    return {
      commentData,
      route,
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      attendees: computed(() => AppState.attendees),
      accountAttendance: computed(() => AppState.accountAttendance),
      eventObj: computed(() => AppState.activeEvent),
      async cancelEvent() {
        try {
          if (await Pop.confirm('Cancel Event?', "You cannot undo this!", "warning", 'Yes, cancel it!'))
            await eventService.cancel(route.params.id)
        } catch (error) {
          logger.log(error)
        }
      },
      async toggleAttend(id = null) {
        try {
          if (!id) {
            await attendeesService.attend(route.params.id)
          } else {
            if (await Pop.confirm('Are you sure you want to Cancel?', 'You might lose your spot!', 'warning', 'Yes, Cancel It!')) {
              await attendeesService.unattend(id, route.params.id)
            }
          }
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message, 'error')
        }
      },
      async createComment() {
        try {
          await commentsService.createComment({ body: commentData.value, eventId: route.params.id, })
          commentData.value = ''
        } catch (error) {
          logger.error(error)
          pop.toast(error.mesage, 'error')
        }
      },
      async removeComment(id) {
        try {
          if (await Pop.confirm('Delete Comment?')) {
            await commentsService.removeComment(id)
          }
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.attendee-pic {
  height: 3em;
}
</style>