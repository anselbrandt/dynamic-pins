import React from "react";
type Coordinates = [number, number];

interface StaticMapProps {
  theme?: string;
  coordinates: Coordinates;
  width?: number;
  height?: number;
  zoom?: number;
  color?: string;
  pinSize?: "s" | "l";
}

export const StaticMap: React.FC<StaticMapProps> = ({
  theme,
  coordinates,
  width = 128,
  height = 64,
  zoom = 14,
  color = "d25044",
  pinSize = "s",
}) => {
  const baseUrl = "https://api.mapbox.com/styles/v1/mapbox";
  const style_id =
    theme === "dark" ? "navigation-night-v1" : "navigation-day-v1";
  const overlay = "pin";
  const token = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const [lon, lat] = coordinates;

  const url = `${baseUrl}/${style_id}/static/${overlay}-${pinSize}+${color}(${lon},${lat})/${lon},${lat},${zoom}/${width}x${height}?access_token=${token}`;
  return <img src={url} alt="map thumbnail" />;
};
