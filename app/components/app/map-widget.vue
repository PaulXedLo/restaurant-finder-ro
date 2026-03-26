<script setup lang="ts">
import "@maptiler/sdk/dist/maptiler-sdk.css";

const mapContainer = ref<HTMLElement | null>(null);
const { initMap } = useMap();

onMounted(() => {
  if (mapContainer.value) {
    initMap(mapContainer.value);
  }
});
</script>

<template>
  <div class="mt-8 px-4 container mx-auto">
    <div
      ref="mapContainer"
      class="rounded-xl overflow-hidden h-[500px] w-full border border-white/10 shadow-2xl"
    ></div>
  </div>
</template>
