import React, { useState } from "react";
import ReactMap, { MapRef, ViewState, Marker, Popup } from "react-map-gl";
import type { Properties } from "../data";
import Pin from "./Pins/Pin";

interface Location {
  lat: number;
  long: number;
  name: string;
}

interface MapProps {
  width: number | string;
  height: number | string;
  data: GeoJSON.FeatureCollection<GeoJSON.Point, Properties>;
  initialViewState: Partial<ViewState>;
  mapRef: React.RefObject<MapRef>;
}

export const Map: React.FC<MapProps> = ({
  width,
  height,
  data,
  initialViewState,
  mapRef,
}) => {
  const mapStyle = "mapbox://styles/mapbox/light-v11";
  const [popupInfo, setPopupInfo] = useState<Location | null>(null);

  return (
    <ReactMap
      reuseMaps
      ref={mapRef}
      initialViewState={initialViewState}
      style={{ width, height }}
      mapStyle={mapStyle}
    >
      {data.features.map((feature, index) => {
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
      })}
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
    </ReactMap>
  );
};
