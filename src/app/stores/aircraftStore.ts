// stores/aircraftStore.js
import { create } from "zustand";
import axios from "axios";

const useAircraftStore = create((set) => ({
  aircraftData: [],
  isLoading: false,
  error: null,
  fetchAircraftData: async () => {
    set({ isLoading: true, error: null }); // Set loading state
    try {
      const response = await axios.get(
        "https://opensky-network.org/api/states/all"
      );

      // Map the data to a more usable format
      const mappedData = response.data.states.map((state) => ({
        icao24: state[0],
        flight: state[1],
        country: state[2],
        timestamp: state[3],
        longitude: state[5],
        latitude: state[6],
        altitude: state[7],
        onGround: state[8],
        speed: state[9],
        verticalSpeed: state[10], // NOTE: verticalSpeed is at index 11
      }));

      set({ aircraftData: mappedData }); // Store the mapped data
    } catch (error) {
      set({ error: error.message }); // Store error if any
    } finally {
      set({ isLoading: false }); // Set loading to false
    }
  },
}));

export default useAircraftStore;
