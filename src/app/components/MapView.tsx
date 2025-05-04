"use client";

import {
  AttributionControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import { aircraftIcon } from "@/lib/fixLeafletIcon"; // Assuming you have a custom icon for the aircraft

import useAircraftStore from "../stores/aircraftStore"; // Import the Zustand store
import { useEffect, useState } from "react";
import UserLocationMarker from "./UserLocationMarker";

import LoadingUI from "./LoadingUI";

const MapView = () => {
  const { aircraftData, isLoading, error, fetchAircraftData } =
    useAircraftStore();

  const [center, setCenter] = useState([51.47, -0.4543]); // Heathrow Airport
  const defaultZoom = 4;

  useEffect(() => {
    fetchAircraftData(); // Fetch aircraft data
  }, [fetchAircraftData]);

  useEffect(() => {
    if (aircraftData.length > 0) {
      // Dynamically set the map center to the first aircraft's position
      const { latitude, longitude } = aircraftData[0];
      if (latitude && longitude) {
        setCenter([latitude, longitude]);
      }
    }
  }, [aircraftData]);

  if (isLoading) {
    return <LoadingUI />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-full w-full border-4 border-blue-500">
      <MapContainer
        center={center || [0, 0]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", zIndex: "40" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <UserLocationMarker />

        {/* {aircraftData.map(
          (plane, idx) =>
            plane.latitude &&
            plane.longitude && (
              <Marker
                key={idx}
                position={[plane.latitude, plane.longitude]}
                icon={aircraftIcon}
              >
                <Popup>{plane.flight || `Aircraft: ${plane.icao24}`}</Popup>
              </Marker>
            )
        )} */}

        <ZoomControl position="bottomright" />
        <AttributionControl position="bottomleft" />
      </MapContainer>
    </div>
  );
};

export default MapView;
