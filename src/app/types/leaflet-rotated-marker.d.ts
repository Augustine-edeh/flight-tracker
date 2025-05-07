import "leaflet";
import "react-leaflet";

declare module "react-leaflet" {
  interface MarkerProps {
    rotationAngle?: number;
    rotationOrigin?: string;
  }
}
