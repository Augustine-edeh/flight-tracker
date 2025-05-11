"use client";

import AircraftMarker from "./AircraftMarker";

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
      {aircraftData
        .slice(0, 10)
        .map(
          (plane, idx) =>
            plane.latitude &&
            plane.longitude && (
              <AircraftMarker key={`aircraft-${idx}`} plane={plane} />
            )
        )}
    </>
  );
};

export default AircraftMarkers;
