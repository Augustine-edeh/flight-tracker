"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "@/lib/fixLeafletIcon";

const MapView = () => {
  return (
    <div className="h-full w-full border-4 border-blue-500">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          {/* <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup> */}

          <Popup>
            ✈️ <strong>Flight Info</strong>
            <br />
            Airline: Demo Air
            <br />
            Flight: DA123
            <br />
            Altitude: 32,000 ft
            <br />
            Speed: 550 knots
            <br />
            Status: En Route
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
