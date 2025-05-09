"use client";

import { Marker, Popup, Tooltip } from "react-leaflet";
import { aircraftIcon } from "@/lib/fixLeafletIcon";

interface Aircraft {
  latitude: number;
  longitude: number;
  heading: number;
  flight?: string;
  icao24: string;
  country?: string;
  altitude?: number;
  speed?: number;
}

const AircraftMarkers = ({ aircraftData }: { aircraftData: Aircraft[] }) => {
  return (
    <>
      {/* NOTE: Consider using useMemo hook to memoize derived datas (`airports` & `aircraftData`) */}
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
                  </div>
                  <div>
                    <strong>Altitude:</strong>{" "}
                    {plane.altitude ? `${Math.round(plane.altitude)} m` : "N/A"}
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
    </>
  );
};

export default AircraftMarkers;
