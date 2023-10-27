import React from "react";
import ReactMap, {
  FullscreenControl,
  GeolocateControl,
  MapRef,
  NavigationControl,
  ViewState,
} from "react-map-gl";
import type { Properties } from "../data";
import { Geocoder } from "./Geocoder";
import { Pins } from "./Pins";
import { CircleLayer } from "./layers/CircleLayer";
import { DrawPolygon } from "./draw/DrawPolygon";
import { PolygonLayer } from "./layers/PolygonLayer";
import { DrawCircle } from "./draw/DrawCircle";

interface MapProps {
  width: number | string;
  height: number | string;
  data: GeoJSON.FeatureCollection<GeoJSON.Point, Properties>;
  initialViewState: Partial<ViewState>;
  mapRef: React.RefObject<MapRef>;
  theme: string;
  drawMode: string;
  setFeatures: (obj: any) => void;
  geofenceType: string;
  radius: number;
}

export const Map: React.FC<MapProps> = ({
  width,
  height,
  data,
  initialViewState,
  mapRef,
  theme,
  drawMode,
  setFeatures,
  geofenceType,
  radius,
}) => {
  const mapStyle =
    theme === "dark"
      ? "mapbox://styles/mapbox/dark-v11"
      : "mapbox://styles/mapbox/light-v11";

  return (
    <ReactMap
      reuseMaps
      ref={mapRef}
      initialViewState={initialViewState}
      style={{ width, height }}
      mapStyle={mapStyle}
    >
      <Geocoder position="top-left" />
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <Pins data={data} />
      {drawMode === "polygon" ? (
        <DrawPolygon setFeatures={setFeatures} />
      ) : null}
      {drawMode === "circle" ? <DrawCircle setFeatures={setFeatures} /> : null}
      {geofenceType === "circle" ? <CircleLayer radius={radius} /> : null}
      {geofenceType === "polygon" ? <PolygonLayer /> : null}
    </ReactMap>
  );
};
