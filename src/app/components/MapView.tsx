"use client";

// NOTE: There is need for refactoring/optimization here
// Needed for leaflet-rotatedmarker plugin to extend Marker
// And I had to import the L instance much earlier before the leaflet-rotatedmarker plugin import because importing the plugin directly after the L import throws an error
// This ensure L is lodead before importing the plugin which depends on it (L)
import L from "leaflet";

// Dummy reference to avoid ESLint error for unused import
void L;

import {
  AttributionControl,
  MapContainer,
  TileLayer,
  ZoomControl,
} from "react-leaflet";

import useAircraftStore from "../stores/aircraftStore"; // Import the Zustand store
import { useEffect, useState } from "react";
import UserLocationMarker from "./UserLocationMarker";
import MapLoadingOverlay from "./MapLoadingOverlay";
import "leaflet-rotatedmarker";
import AirportMarkers from "./AirportMarkers";
import AircraftMarkers from "./AircraftMarkers";

const MapView = () => {
  const {
    aircraftData,
    isLoading,
    // error,
    airports,
    fetchAirports,
    fetchAircraftData,
  } = useAircraftStore();

  const [center, setCenter] = useState<[number, number]>([51.47, -0.4543]); // Heathrow Airport

  useEffect(() => {
    fetchAirports(); // Fetch airports
    fetchAircraftData(); // Fetch aircraft data
  }, [fetchAirports, fetchAircraftData]);

  useEffect(() => {
    if (aircraftData.length > 0) {
      // Dynamically set the map center to the first aircraft's position
      const { latitude, longitude } = aircraftData[0];
      if (latitude && longitude) {
        setCenter([latitude, longitude]);
      }
    }
  }, [aircraftData]);

  // if (error) {
  //   return (
  //     <div className="grid place-items-center h-full w-full bg-red-500 text-white">
  //       <p>Error: {error}</p>
  //     </div>
  //   );
  // }

  return (
    <div className="relative h-full w-full border-4 border-blue-500">
      {isLoading && <MapLoadingOverlay />}

      {/* {error && ( */}

      {/* <div className="absolute top-4 right-4 z-[1000] bg-red-500 text-white px-4 py-2 rounded shadow-md">
        <p>Error: {error}</p>
      </div> */}

      {/*  )} */}

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
        <AirportMarkers airports={airports} />
        <AircraftMarkers aircraftData={aircraftData} />
        <ZoomControl position="bottomright" />
        <AttributionControl position="bottomleft" />
      </MapContainer>
    </div>
  );
};

export default MapView;
