import axios from "axios";

export const fetchAircraftStates = async () => {
  const url = "https://opensky-network.org/api/states/all";
  const response = await axios.get(url);
  return response.data;
};
