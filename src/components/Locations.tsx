import React from "react";
import type { Properties } from "../data";

interface LocationsProps {
  data: GeoJSON.FeatureCollection<GeoJSON.Point, Properties>;
  handleSelectLocation: (coordinates: GeoJSON.Position) => void;
}

export const Locations: React.FC<LocationsProps> = ({
  data,
  handleSelectLocation,
}) => {
  return (
    <div className="my-2">
      {data.features.map((feature, index) => (
        <div key={index}>
          <button
            className="btn btn-link"
            onClick={() => handleSelectLocation(feature.geometry.coordinates)}
          >
            {feature.properties.name}
          </button>
        </div>
      ))}
    </div>
  );
};
