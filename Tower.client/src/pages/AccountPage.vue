<template class="container-fluid">
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="row">
    <h3>Your Attendance:</h3>
    <div v-for="a in attendance" :key="a.id" class="col-12">
      <event :event="a" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Account',

  setup() {
    return {
      attendance: computed(() => AppState.accountAttendance),
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
