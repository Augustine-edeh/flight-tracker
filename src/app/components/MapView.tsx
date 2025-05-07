"use client";

// NOTE: There is need for refactoring/optimization here
// Needed for leaflet-rotatedmarker plugin to extend Marker
// And I had to import the L instance much earlier before the leaflet-rotatedmarker plugin import because importing the plugin directly after the L import throws an error
// This ensure L is lodead before importing the plugin which depends on it (L)
import L from "leaflet";

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
import "leaflet-rotatedmarker";

const MapView = () => {
  const { aircraftData, isLoading, error, fetchAircraftData } =
    useAircraftStore();

  const [center, setCenter] = useState<[number, number]>([51.47, -0.4543]); // Heathrow Airport

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
        center={center}
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

        {aircraftData.slice(0, 10).map(
          (plane, idx) =>
            plane.latitude &&
            plane.longitude && (
              <Marker
                key={idx}
                position={[plane.latitude, plane.longitude]}
                icon={aircraftIcon}
                rotationAngle={plane.heading || 0}
                rotationOrigin="center"
              >
                <Popup>{plane.flight || `Aircraft: ${plane.icao24}`}</Popup>
              </Marker>
            )
        )}

        <ZoomControl position="bottomright" />
        <AttributionControl position="bottomleft" />
      </MapContainer>
    </div>
  );
};

export default MapView;
