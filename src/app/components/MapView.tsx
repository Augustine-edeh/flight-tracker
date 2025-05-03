"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { aircraftIcon } from "@/lib/fixLeafletIcon";

const MapView = () => {
  const aircrafts = [
    { lat: 34.0522, lng: -118.2437, label: "Flight A - LAX" },
    { lat: 35.6895, lng: 139.6917, label: "Flight B - Tokyo" },
  ];
  return (
    <div className="h-full w-full border-4 border-blue-500">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", zIndex: "40" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {aircrafts.map((plane, idx) => (
          <Marker
            key={idx}
            position={[plane.lat, plane.lng]}
            icon={aircraftIcon}
          >
            <Popup>{plane.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
