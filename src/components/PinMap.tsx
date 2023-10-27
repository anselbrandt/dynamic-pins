import React from "react";
import ReactMap, { MapRef, ViewState } from "react-map-gl";
import type { Properties } from "../data";
import { Pins } from "./Pins";

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

  return (
    <ReactMap
      reuseMaps
      ref={mapRef}
      initialViewState={initialViewState}
      style={{ width, height }}
      mapStyle={mapStyle}
    >
      <Pins data={data} />
    </ReactMap>
  );
};
