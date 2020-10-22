<template>
  <div style="text-align:center;margin-top:100px">
    <testIcon type="icon-404" style="font-size:100px" />
    <!-- <img :src="logo" alt="403" title="403hihi" /> -->
    <logo />
  </div>
</template>

<script>
import logo from "@/assets/403.svg";
export default {
  // svg
  components: {
    logo
  }
  // img
  // data() {
  //   return {
  //     logo
  //   };
  // }
};
</script>

<style></style>
