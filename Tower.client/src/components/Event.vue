<template>
  <div class="eventCard card bg-dark text-white row m-3">
    <img src="http://thiscatdoesnotexist.com" class="card-img" alt="..." />
    <div class="card-img-overlay col-12">
      <div class="blur d-flex row">
        <h5 class="card-title col-12">Test Name</h5>
        <p class="card-text col-12">
          Lorem ipsum dolor sit amet consectetur adipisicing.
        </p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  //   props: {
  //     eventObj: {
  //       type: Object,
  //       required: true
  //     }
  //   },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.blur {
  backdrop-filter: blur(8px);
}
</style>