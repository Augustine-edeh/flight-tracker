import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { userLocationIcon } from "@/lib/fixLeafletIcon";
import { LocationEvent, LatLng } from "leaflet"; // Import LatLng type

const UserLocationMarker = () => {
  // Type position to accept either LatLng or null
  const [position, setPosition] = useState<LatLng | null>(null);
  const map = useMap();

  useEffect(() => {
    map.locate();

    const handleLocationFound = (e: LocationEvent) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 7);
    };

    map.on("locationfound", handleLocationFound);

    return () => {
      map.off("locationfound", handleLocationFound);
    };
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={userLocationIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

export default UserLocationMarker;
