"use client";

import { Marker, Popup, Tooltip } from "react-leaflet";
import { airportIcon } from "@/lib/fixLeafletIcon";

interface Airport {
  name: string;
  municipality: string;
  iso_country: string;
  latitude_deg: number;
  longitude_deg: number;
}

const AirportMarkers = ({ airports }: { airports: Airport[] }) => {
  return (
    <>
      {/* NOTE: Consider using useMemo hook to memoize derived datas (`airports` & `aircraftData`) */}
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

          <Popup offset={[0, -4]}>
            <div>
              <strong>{airport.name}</strong>
              <br />
              {airport.municipality}, {airport.iso_country}
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default AirportMarkers;
