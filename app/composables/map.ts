import { ref } from "vue";
import * as maptilersdk from "@maptiler/sdk";

const mapInstance = ref<maptilersdk.Map | null>(null);
const suggestions = ref<any[]>([]);
const isLoading = ref(false);
const currentMarkers = ref<maptilersdk.Marker[]>([]);
const closeModal = () => {
  selectedRestaurant.value = null;
};
const selectedTypeOfRestaurant = ref<string>("all");
const selectedRestaurant = ref<any | null>(null);

export const useMap = () => {
  const ROMANIA_BBOX: [number, number, number, number] = [
    20.26, 43.62, 29.71, 48.27,
  ];
  // reset map
  const resetMap = () => {
    suggestions.value = [];
    currentMarkers.value.forEach((marker) => marker.remove());
    currentMarkers.value = [];
    mapInstance.value?.flyTo({
      center: [24.9668, 45.9432],
      zoom: 6,
      speed: 1.5,
      essential: true,
    });
  };
  // map init
  const initMap = (container: HTMLElement) => {
    maptilersdk.config.apiKey = "ur6EoTDzR5sRlIy54cx8";
    mapInstance.value = new maptilersdk.Map({
      container,
      style: maptilersdk.MapStyle.STREETS,
      center: [24.9668, 45.9432],
      zoom: 6,
      maxBounds: [
        [20.26, 43.62],
        [29.71, 48.27],
      ],
    });
    mapInstance.value.on("moveend", () => {
      if (mapInstance.value!.getZoom() > 12) {
        fetchRestaurantsInView();
      }
    });
  };
  // fetch restaurants in view
  const fetchRestaurantsInView = async () => {
    if (!mapInstance.value) return;
    //Get the current map boundaries
    const bounds = mapInstance.value.getBounds();
    const bboxString = `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`;
    try {
      isLoading.value = true;
      const data = await $fetch("/api/restaurants", {
        query: {
          bbox: bboxString,
          type: selectedTypeOfRestaurant.value,
        },
      });
      renderMarkers(data as any[]);
    } catch (error) {
      console.error("Backend fetch failed:", error);
    } finally {
      isLoading.value = false;
    }
  };
  // render markers
  const renderMarkers = (restaurants: any[]) => {
    // removing current markers so no duplicates
    currentMarkers.value.forEach((marker) => marker.remove());
    currentMarkers.value = [];
    // adding new markers
    restaurants.forEach((place) => {
      const name = place.tags?.name || "Unnamed place";
      const cuisineType = place.tags?.cuisine
        ? `<br><small>Type: ${place.tags.cuisine}</small>`
        : ``;
      const popup = new maptilersdk.Popup({ offset: 25 }).setHTML(
        `<b>${name}</b>`,
      );
      const marker = new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat([place.lon, place.lat])
        .setPopup(popup)
        .addTo(mapInstance.value);
      marker.getElement().addEventListener("click", (e) => {
        e.stopPropagation();
        selectedRestaurant.value = place;
        mapInstance.value?.panTo([place.lon, place.lat], { duration: 500 });
      });
      currentMarkers.value.push(marker);
    });
  };
  // search cities
  const searchCities = async (query: string) => {
    if (query.length < 2) {
      suggestions.value = [];
      return;
    }
    isLoading.value = true;
    try {
      const result = await maptilersdk.geocoding.forward(query, {
        bbox: ROMANIA_BBOX,
        limit: 5,
      });
      suggestions.value = result.features;
    } finally {
      isLoading.value = false;
    }
  };
  // fly to a location
  const flyToLocation = (coords: [number, number]) => {
    mapInstance.value?.flyTo({
      center: coords,
      zoom: 12,
      essential: true,
    });
    suggestions.value = [];
  };

  return {
    mapInstance,
    resetMap,
    selectedTypeOfRestaurant,
    selectedRestaurant,
    fetchRestaurantsInView,
    suggestions,
    initMap,
    closeModal,
    searchCities,
    flyToLocation,
    isLoading,
  };
};
