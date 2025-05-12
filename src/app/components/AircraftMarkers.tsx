"use client";

import { useMemo, useRef } from "react";

import AircraftMarker from "./AircraftMarker";
import MarkerClusterGroup from "react-leaflet-markercluster";

import type { MarkerClusterGroup as LeafletMarkerClusterGroup } from "leaflet.markercluster";

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
  const clusterRef = useRef<LeafletMarkerClusterGroup | null>(null);

  const markers = useMemo(
    () =>
      aircraftData
        .slice(0, 10)
        .map(
          (plane, idx) =>
            plane.latitude &&
            plane.longitude && (
              <AircraftMarker key={`aircraft-${idx}`} plane={plane} />
            )
        ),
    [aircraftData]
  );

  return <MarkerClusterGroup ref={clusterRef}>{markers}</MarkerClusterGroup>;
};

export default AircraftMarkers;
