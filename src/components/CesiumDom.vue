<script setup>
import { ref, onMounted } from "vue";
import { initCesium } from "../js/initCesium";

onMounted(() => {
  initCesium();
});

</script>

<template>
  <div id="cesiumContainer"></div>
</template>

<style scoped>
#cesiumContainer {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>