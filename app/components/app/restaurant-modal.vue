<script setup lang="ts">
const { selectedRestaurant, closeModal } = useMap();
</script>
<template>
  <dialog
    id="restaurant_modal"
    class="modal modal-bottom sm:modal-middle"
    :class="{ 'modal-open': selectedRestaurant !== null }"
  >
    <div
      class="modal-box bg-base-100 relative overflow-hidden"
      v-if="selectedRestaurant"
    >
      <button
        @click="closeModal"
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10 bg-black/50 text-white hover:bg-black/70"
      >
        ✕
      </button>

      <figure class="-mt-6 -mx-6 mb-4">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80"
          alt="Restaurant view"
          class="w-full h-48 object-cover"
        />
      </figure>

      <h3 class="font-bold text-2xl mb-1">
        {{ selectedRestaurant.tags?.name || "Unnamed Restaurant" }}
      </h3>

      <div class="flex flex-wrap gap-2 mb-4">
        <div
          class="badge badge-primary"
          v-if="selectedRestaurant.tags?.cuisine"
        >
          {{ selectedRestaurant.tags.cuisine }}
        </div>
        <div
          class="badge badge-outline"
          v-if="selectedRestaurant.tags?.amenity"
        >
          {{ selectedRestaurant.tags.amenity.replace("_", " ") }}
        </div>
        <div
          v-if="selectedRestaurant.tags?.['addr:street']"
          class="flex items-center gap-2"
        >
          <Icon name="tabler:pin" size="20" />
          <span>{{ selectedRestaurant.tags["addr:street"] }}</span>
        </div>
      </div>
      <div class="space-y-2 text-sm opacity-80">
        <p v-if="selectedRestaurant.tags?.opening_hours">
          <Icon name="tabler:clock" class="mr-2 align-text-bottom" />
          {{ selectedRestaurant.tags.opening_hours }}
        </p>
        <p v-if="selectedRestaurant.tags?.website">
          <Icon name="tabler:world" class="mr-2 align-text-bottom" />
          <a
            :href="selectedRestaurant.tags.website"
            target="_blank"
            class="link link-primary"
            >Website</a
          >
        </p>
        <p v-if="selectedRestaurant.tags?.phone">
          <Icon name="tabler:phone" class="mr-2 align-text-bottom" />
          {{ selectedRestaurant.tags.phone }}
        </p>
      </div>

      <div class="modal-action mt-6">
        <button class="btn btn-primary w-full" @click="closeModal">
          Add review
        </button>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop" @click="closeModal">
      <button>close</button>
    </form>
  </dialog>
</template>
