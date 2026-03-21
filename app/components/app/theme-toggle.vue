<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(value) {
    colorMode.preference = value ? "dark" : "light";
  },
});
</script>

<template>
  <label class="swap swap-rotate mx-4">
    <input type="checkbox" v-model="isDark" />
    <Icon class="swap-on" size="24" name="tabler:sunset-2" />
    <Icon class="swap-off" size="24" name="tabler:moon-stars" />
  </label>
</template>
