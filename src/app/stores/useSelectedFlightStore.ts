import { create } from "zustand";

type LatLng = [number, number];

interface SelectedFlightStore {
  icao24: string | null;
  track: LatLng[];
  isLoading: boolean;
  error: string | null;
  setFlight: (icao24: string) => void;
  setTrack: (track: LatLng[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clear: () => void;
}

const useSelectedFlightStore = create<SelectedFlightStore>((set) => ({
  icao24: null,
  track: [],
  isLoading: false,
  error: null,
  setFlight: (icao24) => set({ icao24 }),
  setTrack: (track) => set({ track }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clear: () =>
    set({
      icao24: null,
      track: [],
      isLoading: false,
      error: null,
    }),
}));

export default useSelectedFlightStore;
