import React from "react";
import { useState } from "react";
import { useControl, Marker, ControlPosition } from "react-map-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN as string;

type GeocoderProps = {
  position: ControlPosition;
};

export const Geocoder: React.FC<GeocoderProps> = (props: GeocoderProps) => {
  const [marker, setMarker] = useState<React.ReactElement | null>(null);

  useControl<MapboxGeocoder>(
    () => {
      const geocoder = new MapboxGeocoder({
        marker: false,
        accessToken: accessToken,
      });
      geocoder.on("result", (event) => {
        const { result } = event;
        const location =
          result &&
          (result.center ||
            (result.geometry?.type === "Point" && result.geometry.coordinates));
        if (location) {
          setMarker(<Marker longitude={location[0]} latitude={location[1]} />);
        } else {
          setMarker(null);
        }
      });
      return geocoder;
    },
    {
      position: props.position,
    }
  );
  return marker;
};
