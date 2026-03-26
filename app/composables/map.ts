import { ref } from "vue";
import * as maptilersdk from "@maptiler/sdk";

const mapInstance = ref<maptilersdk.Map | null>(null);
const suggestions = ref<any[]>([]);
const isLoading = ref(false);
export const useMap = () => {
  const ROMANIA_BBOX: [number, number, number, number] = [
    20.26, 43.62, 29.71, 48.27,
  ];
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
    suggestions,
    initMap,
    searchCities,
    flyToLocation,
    isLoading,
  };
};
