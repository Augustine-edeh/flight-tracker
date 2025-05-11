import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet's default icon path issue
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => string })
  ._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "leaflet/dist/images/marker-icon-2x.png",
  iconUrl: "leaflet/dist/images/marker-icon.png",
  shadowUrl: "leaflet/dist/images/marker-shadow.png",
});

// Aircraft icon (default)
export const defaultAircraftIcon = L.icon({
  iconUrl: "/air_craft_default.svg",
  iconSize: [12, 12],
  iconAnchor: [16, 16],
});

// Aircraft icon (on hover)
export const hoverAircraftIcon = L.icon({
  iconUrl: "/air_craft_hover.svg",
  iconSize: [12, 12],
  iconAnchor: [16, 16],
});

// Airport icon
export const airportIcon = L.icon({
  iconUrl: "/airport-icon.svg",
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

// Airport icon
export const userLocationIcon = L.icon({
  iconUrl: "/user-location.svg", // Add your airport icon in the public folder
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});
