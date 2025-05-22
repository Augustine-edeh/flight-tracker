import axios from "axios";

export const fetchFlightTrack = async (icao24: string, time: number) => {
  try {
    const response = await axios.get(
      `https://opensky-network.org/api/tracks/all?icao24=${icao24}&time=${time}`
    );

    if (!response.data.path) throw new Error("No path found.");

    // Extract [lat, lng] pairs
    return response.data.path.map((point: any) => [point[1], point[2]]);
  } catch (error: any) {
    console.error("Failed to fetch track:", error);
    throw error;
  }
};
