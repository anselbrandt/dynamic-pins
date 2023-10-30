import React, { useState } from "react";
import ReactMap, { MapRef, ViewState, Marker, Popup } from "react-map-gl";
import { Source, Layer } from "react-map-gl";
import type { Properties } from "../data";
import Pin from "./Pins/Pin";
import type { FillLayer } from "react-map-gl";
import { circle, Units } from "@turf/turf";

interface Location {
  lat: number;
  long: number;
  name: string;
}

interface MapProps {
  width: number | string;
  height: number | string;
  data: GeoJSON.Feature<GeoJSON.Point, Properties>;
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
  const units: Units = "meters";
  const options = { steps: 64, units, properties: { name: "Geofence" } };

  return (
    <ReactMap
      reuseMaps
      ref={mapRef}
      initialViewState={initialViewState}
      style={{ width, height }}
      mapStyle={mapStyle}
    >
      {data ? (
        <Marker
          longitude={data.geometry.coordinates[0]}
          latitude={data.geometry.coordinates[1]}
          anchor="bottom"
          onClick={(event) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            event.originalEvent.stopPropagation();
            setPopupInfo({
              lat: data.geometry.coordinates[1],
              long: data.geometry.coordinates[0],
              name: data.properties.name,
            });
          }}
        >
          <Pin />
        </Marker>
      ) : null}
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
      {data ? (
        <Source id="my-data" type="geojson" data={circle(data, 50, options)}>
          <Layer {...dataLayer} />
        </Source>
      ) : null}
    </ReactMap>
  );
};

const dataLayer: FillLayer = {
  id: "data",
  type: "fill",
  paint: {
    "fill-color": "#ff6347",
    "fill-opacity": 0.1,
  },
};
