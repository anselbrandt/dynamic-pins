import React from "react";
import { Source, Layer } from "react-map-gl";
import { marcheJeanTalon } from "../../data";
import { circle, Units } from "@turf/turf";
import type { FillLayer } from "react-map-gl";

interface CircleLayerProps {
  radius?: number;
}

export const CircleLayer: React.FC<CircleLayerProps> = ({ radius = 125 }) => {
  const units: Units = "meters";
  const options = { steps: 64, units, properties: { name: "Geofence" } };
  const geojson = circle(marcheJeanTalon, radius, options);

  const dataLayer: FillLayer = {
    id: "data",
    type: "fill",
    paint: {
      "fill-color": "#ff6347",
      "fill-opacity": 0.1,
    },
  };

  return (
    <Source id="my-data" type="geojson" data={geojson}>
      <Layer {...dataLayer} />
    </Source>
  );
};
