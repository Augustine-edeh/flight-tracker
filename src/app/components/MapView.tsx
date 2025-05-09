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
  Marker,
  Popup,
  Tooltip,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import { aircraftIcon, airportIcon } from "@/lib/fixLeafletIcon"; // Import custom icon for aircrafts

import useAircraftStore from "../stores/aircraftStore"; // Import the Zustand store
import { useEffect, useState } from "react";
import UserLocationMarker from "./UserLocationMarker";
import MapLoadingOverlay from "./MapLoadingOverlay";
import "leaflet-rotatedmarker";

const MapView = () => {
  const {
    aircraftData,
    isLoading,
    error,
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

  if (error) {
    return (
      <div className="grid place-items-center h-full w-full bg-red-500 text-white">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full border-4 border-blue-500">
      {isLoading && <MapLoadingOverlay />}

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

        {/* NOTE: Consider using useMemo hook to memoize derived datas (`airports` & `aircraftData`) */}
        {/* Render airport markers */}
        {airports.slice(0, 10).map((airport, idx) => (
          <Marker
            key={`airport-${idx}`}
            position={[airport.latitude_deg, airport.longitude_deg]}
            icon={airportIcon}
          >
            <Tooltip direction="top" offset={[0, -12]}>
              <div>
                <strong>{airport.name}</strong>
              </div>
            </Tooltip>

            <Popup>
              <div>
                <strong>{airport.name}</strong>
                <br />
                {airport.municipality}, {airport.iso_country}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Render aircraft markers */}
        {/* NOTE: add implementation show only airbone aircrafts */}
        {aircraftData.slice(0, 10).map(
          (plane, idx) =>
            plane.latitude &&
            plane.longitude && (
              <Marker
                key={`aircraft-${idx}`}
                position={[plane.latitude, plane.longitude]}
                icon={aircraftIcon}
                rotationAngle={plane.heading || 0}
                rotationOrigin="center"
              >
                <Tooltip direction="top" offset={[-10, -15]}>
                  {plane.flight || `Aircraft: ${plane.icao24}`}
                </Tooltip>

                <Popup offset={[-10, -8]}>
                  <div className="space-y-1 text-sm">
                    <div>
                      <strong>Flight:</strong> {plane.flight || "N/A"}
                    </div>
                    <div>
                      <strong>ICAO24:</strong> {plane.icao24}
                    </div>
                    <div>
                      <strong>Country:</strong> {plane.country || "N/A"}
                      {/* <img
                        src={`https://flagcdn.com/24x18/us.png`}
                        alt={plane.country}
                        className="inline w-5 h-auto rounded-sm"
                      /> */}
                    </div>
                    <div>
                      <strong>Altitude:</strong>{" "}
                      {plane.altitude
                        ? `${Math.round(plane.altitude)} m`
                        : "N/A"}
                    </div>
                    <div>
                      <strong>Speed:</strong>{" "}
                      {plane.speed
                        ? `${Math.round(plane.speed * 3.6)} km/h`
                        : "N/A"}
                    </div>
                    <div>
                      <strong>Heading:</strong>{" "}
                      {plane.heading !== null && plane.heading !== undefined
                        ? `${Math.round(plane.heading)}°`
                        : "N/A"}
                    </div>
                  </div>
                </Popup>
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
