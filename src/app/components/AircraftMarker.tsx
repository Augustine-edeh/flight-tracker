import { useRef } from "react";
import { Marker, Popup, Tooltip, Polyline } from "react-leaflet";
import L from "leaflet";

import { defaultAircraftIcon, hoverAircraftIcon } from "@/lib/fixLeafletIcon";
import useSelectedFlightStore from "../stores/useSelectedFlightStore";
import { fetchFlightTrack } from "../services/fetchFlightTrack";

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

const AircraftMarker = ({ plane }: { plane: Aircraft }) => {
  const markerRef = useRef<L.Marker>(null);

  const { setFlight, setTrack, setLoading, setError, track } =
    useSelectedFlightStore();

  const handleClick = async () => {
    console.log(plane.icao24);
    try {
      setFlight(plane.icao24);
      setLoading(true);
      setError(null);

      const now = Math.floor(Date.now() / 1000);
      // const track = await fetchFlightTrack(plane.icao24, now - 3600); // 1 hour history
      const track = await fetchFlightTrack(plane.icao24, 0);
      console.log(track);
      setTrack(track);
    } catch (error) {
      setError("Unable to fetch flight path.");
    } finally {
      setLoading(false);
    }
  };

  const eventHandlers = {
    mouseover: () => {
      // change icon to hover-aircraft icon
      markerRef.current?.setIcon(hoverAircraftIcon);
    },
    mouseout: () => {
      // change icon back to default-aircraft icon
      markerRef.current?.setIcon(defaultAircraftIcon);
    },
    click: handleClick,
  };

  return (
    <Marker
      ref={markerRef}
      position={[plane.latitude, plane.longitude]}
      icon={defaultAircraftIcon}
      rotationAngle={plane.heading || 0}
      rotationOrigin="center"
      eventHandlers={eventHandlers}
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
            {plane.speed ? `${Math.round(plane.speed * 3.6)} km/h` : "N/A"}
          </div>
          <div>
            <strong>Heading:</strong>{" "}
            {plane.heading !== null && plane.heading !== undefined
              ? `${Math.round(plane.heading)}°`
              : "N/A"}
          </div>
        </div>
      </Popup>

      {/* Show track if available */}
      {track.length > 1 && (
        <Polyline positions={track} color="purple" weight={3} opacity={0.7} />
      )}
    </Marker>
  );
};

export default AircraftMarker;
