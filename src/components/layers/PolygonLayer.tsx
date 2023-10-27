import React from "react";
import { Source, Layer } from "react-map-gl";
import { marchePoly } from "../../data";
import type { FillLayer } from "react-map-gl";

export const PolygonLayer = () => {
  const dataLayer: FillLayer = {
    id: "data",
    type: "fill",
    paint: {
      "fill-color": "#ff6347",
      "fill-opacity": 0.1,
    },
  };

  return (
    <Source id="my-data" type="geojson" data={marchePoly as GeoJSON.Feature}>
      <Layer {...dataLayer} />
    </Source>
  );
};
