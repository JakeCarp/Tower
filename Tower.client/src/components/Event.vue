<template>
  <div class="eventCard card bg-dark text-white row m-3" @click="routeTo">
    <img
      :src="eventObj.coverImg"
      class="card-img"
      alt="event cover image"
      aria-describedby="event cover image"
    />
    <div class="card-img-overlay col-12 d-flex align-items-end">
      <div class="blur d-flex row">
        <h5 class="card-title col-12 event-text p-0 m-0">
          {{ eventObj.name }}
        </h5>
        <p v-if="!eventObj.isCanceled" class="card-text col-12 event-text">
          {{ eventObj.type.toUpperCase() }} - {{ eventObj.location }} -
          Capacity: <span>{{ eventObj.capacity }}</span> Starting:
          {{ eventObj.startDate }}
        </p>
        <p v-else class="bg-danger">EVENT CANCELLED</p>
        <p v-if="eventObj.capacity === 0" class="bg-warn">EVENT FULL</p>
      </div>
    </div>
  </div>
</template>


<script>
import { useRouter } from 'vue-router'
export default {
  props: {
    eventObj: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    return {
      router,
      routeTo() {
        router.push({
          name: "Event",
          params: { id: props.eventObj.id }
        })
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.blur {
  backdrop-filter: blur(8px);
}
.event-text {
  text-shadow: 2px, 2px, black;
}
</style>