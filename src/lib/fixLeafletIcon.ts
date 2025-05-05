import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet's default icon path issue
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "leaflet/dist/images/marker-icon-2x.png",
  iconUrl: "leaflet/dist/images/marker-icon.png",
  shadowUrl: "leaflet/dist/images/marker-shadow.png",
});

// Aircraft icon
export const aircraftIcon = L.icon({
  iconUrl: "/plane-icon-1.svg", // Ensure this path is correct and the file exists
  iconSize: [12, 12],
  iconAnchor: [16, 16],
});

// Airport icon
export const airportIcon = L.icon({
  iconUrl: "/airport-icon.svg", // Add your airport icon in the public folder
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

// Airport icon
export const userLocationIcon = L.icon({
  iconUrl: "/user-location.svg", // Add your airport icon in the public folder
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});
