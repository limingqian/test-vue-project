<template>
  <div class="background">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style>
.background {
  background: url(./../assets/cat5.gif) no-repeat center center;
  height: 100vh;
  width: 100%;
  background-size: cover;
}
</style>
