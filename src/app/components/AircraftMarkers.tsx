"use client";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import { useMemo, useRef } from "react";

import AircraftMarker from "./AircraftMarker";
import MarkerClusterGroup from "react-leaflet-markercluster";

import L from "leaflet";

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
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);

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
