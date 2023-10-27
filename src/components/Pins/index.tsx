import React from "react";
import { useState, useMemo } from "react";
import { Marker, Popup } from "react-map-gl";
import Pin from "./Pin";
import type { Properties } from "../../data";

interface Location {
  lat: number;
  long: number;
  name: string;
}

interface PinsProps {
  data: GeoJSON.FeatureCollection<GeoJSON.Point, Properties>;
}

export const Pins: React.FC<PinsProps> = ({ data }) => {
  const [popupInfo, setPopupInfo] = useState<Location | null>(null);

  const pins = useMemo(
    () =>
      data.features.map((feature, index) => {
        const [long, lat] = feature.geometry.coordinates;
        const name = feature.properties.name;
        return (
          <Marker
            key={`marker-${index}`}
            longitude={long}
            latitude={lat}
            anchor="bottom"
            onClick={(event) => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`
              event.originalEvent.stopPropagation();
              setPopupInfo({ lat, long, name });
            }}
          >
            <Pin />
          </Marker>
        );
      }),
    [data]
  );
  return (
    <>
      {pins}

      {popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.long)}
          latitude={Number(popupInfo.lat)}
          onClose={() => setPopupInfo(null)}
        >
          <h5>{popupInfo.name}</h5>
        </Popup>
      )}
    </>
  );
};
