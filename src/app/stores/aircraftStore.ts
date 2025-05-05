import { create } from "zustand";
import axios from "axios";

type StateVector = [
  string, // icao24
  string, // callsign
  string, // origin_country
  number, // time_position
  number, // last_contact
  number, // longitude
  number, // latitude
  number, // baro_altitude
  boolean, // on_ground
  number, // velocity
  number, // true_track
  number // vertical_rate
];

interface MappedDataType {
  icao24: string;
  flight: string;
  country: string;
  timestamp: number;
  longitude: number;
  latitude: number;
  altitude: number;
  onGround: boolean;
  speed: number;
  verticalSpeed: number;
  heading: number;
}

interface AircraftStoreState {
  aircraftData: MappedDataType[];
  isLoading: boolean;
  error: string | null;
  fetchAircraftData: () => Promise<void>;
}

const useAircraftStore = create<AircraftStoreState>((set) => ({
  aircraftData: [],
  isLoading: false,
  error: null,
  fetchAircraftData: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(
        "https://opensky-network.org/api/states/all"
      );

      const mappedData: MappedDataType[] = response.data.states.map(
        (state: StateVector) => ({
          icao24: state[0],
          flight: state[1],
          country: state[2],
          timestamp: state[3],
          longitude: state[5],
          latitude: state[6],
          altitude: state[7],
          onGround: state[8],
          speed: state[9],
          heading: state[10],
          verticalSpeed: state[11],
        })
      );

      set({ aircraftData: mappedData });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred.";
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAircraftStore;
