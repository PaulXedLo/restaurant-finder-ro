<script setup lang="ts">
const searchQuery = ref("");
const {
  searchCities,
  suggestions,
  flyToLocation,
  isLoading,
  selectedTypeOfRestaurant,
  fetchRestaurantsInView,
  resetMap,
} = useMap();
const onInput = () => {
  if (searchQuery.value.trim() === "") {
    resetMap();
    return;
  }
  setTimeout(() => {
    searchCities(searchQuery.value);
  }, 300);
};
const selectCity = (city: any) => {
  searchQuery.value = city.place_name;
  flyToLocation(city.geometry.coordinates);
};

const onFilterChange = () => {
  fetchRestaurantsInView();
};
</script>
<template>
  <div>
    <h1 class="text-white text-center mt-8 text-2xl font-bold">
      Find a Restaurant
    </h1>
    <AppRestaurantModal />
    <div class="mt-4 flex flex-col gap-2 mx-auto max-w-xs px-4 relative">
      <label class="input input-bordered flex items-center gap-2 bg-base-200">
        <span
          v-if="isLoading"
          class="loading loading-spinner loading-sm text-primary"
        ></span>
        <Icon v-else size="20" name="tabler:search" class="opacity-70" />

        <input
          v-model="searchQuery"
          @input="onInput"
          type="search"
          class="grow"
          placeholder="Search for a city..."
        />
      </label>
      <select
        v-model="selectedTypeOfRestaurant"
        @change="onFilterChange"
        class="select w-30 mx-auto cursor-pointer"
      >
        <option disabled selected>Select type</option>
        <option value="all">All Food</option>
        <option value="pizza">Pizza🍕</option>
        <option value="burger">Burgers🍔</option>
        <option value="coffee">Coffee☕</option>
        <option value="kebab">Kebab🥙</option>
      </select>
      <ul
        v-if="suggestions.length"
        class="menu bg-base-200 w-full rounded-box absolute top-14 left-0 z-[50] shadow-2xl border border-white/5"
      >
        <li v-for="s in suggestions" :key="s.id">
          <a @click="selectCity(s)" class="py-3">
            <Icon name="tabler:map-pin" class="text-primary" />
            {{ s.place_name }}
          </a>
        </li>
      </ul>
    </div>

    <ClientOnly>
      <AppMapWidget />
    </ClientOnly>
  </div>
</template>
