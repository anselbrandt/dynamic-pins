import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Map } from "./components/Map";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

import { data } from "./data";
import ControlPanel from "./components/ControlPanel";
import { bbox } from "@turf/turf";
import { MapRef } from "react-map-gl";
import { ThemeToggle } from "./components/ui/ThemeToggle";
import { Autofill } from "./components/Autofill";
import { ZoomExtents } from "./components/ui/ZoomExtents";
import { Locations } from "./components/Locations";
import { ResponsiveToggle } from "./components/ui/ResponsiveToggle";
import { StaticMap } from "./components/StaticMap";
import { merinio } from "./data";
import { GeofenceSelector } from "./components/ui/GeofenceSelector";
import { DrawModeSelector } from "./components/ui/DrawModeSelector";
import { RangeSlider } from "./components/ui/RangeSlider";

const pad = 100;

function App() {
  const [theme, setTheme] = useState("light");
  const [isResponsive, setIsResponsive] = useState(false);
  const [drawMode, setDrawMode] = useState("off");
  const [features, setFeatures] = useState();
  const [geofenceType, setGeofenceType] = useState("circle");
  const [value, setValue] = useState(50);
  const mapRef = useRef<MapRef>(null);
  const [minLng, minLat, maxLng, maxLat] = bbox(data);
  const bounds = [
    [minLng, minLat],
    [maxLng, maxLat],
  ];
  const initialViewState = {
    bounds,
    fitBoundsOptions: {
      padding: {
        left: pad,
        top: pad,
        right: pad,
        bottom: pad,
      },
    },
    longitude: 0,
    latitude: 0,
  };

  const handleZoomExtents = () => {
    if (!mapRef.current) return;
    mapRef.current.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: pad, duration: 1000 }
    );
  };

  const handleSelectLocation = useCallback((coordinates: GeoJSON.Position) => {
    const [lng, lat] = coordinates;
    mapRef.current?.flyTo({ center: [lng, lat], duration: 1000 });
  }, []);

  const handleSetTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const handleSetResponsive = () => {
    setIsResponsive((prev) => !prev);
  };

  const handleSetGeofenceType = (event) => {
    setGeofenceType(event.target.value);
  };

  const handleSetValue = (event) => {
    setValue(event.target.value);
  };

  const handleSetDrawMode = (event) => {
    setFeatures(undefined);
    setDrawMode(event.target.value);
  };

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.resize();
  }, [isResponsive]);

  return (
    <div className="d-flex flex-column align-items-center">
      <Map
        width={isResponsive ? "100vw" : 600}
        height={isResponsive ? "100vh" : 400}
        data={data}
        initialViewState={initialViewState}
        mapRef={mapRef}
        theme={theme}
        drawMode={drawMode}
        setFeatures={setFeatures}
        geofenceType={geofenceType}
        radius={value}
      />
      <ControlPanel>
        <Locations data={data} handleSelectLocation={handleSelectLocation} />
        <div className="d-flex flex-column">
          <GeofenceSelector
            geofenceType={geofenceType}
            handleChange={handleSetGeofenceType}
          />
          {geofenceType === "circle" ? (
            <RangeSlider value={value} handleChange={handleSetValue} />
          ) : null}
          <DrawModeSelector
            drawMode={drawMode}
            handleChange={handleSetDrawMode}
          />
          <ZoomExtents theme={theme} handleZoomExtents={handleZoomExtents} />
          <ResponsiveToggle
            theme={theme}
            isResponsive={isResponsive}
            handleSetResponsive={handleSetResponsive}
          />
          <ThemeToggle theme={theme} handleSetTheme={handleSetTheme} />
        </div>
        <Autofill />
      </ControlPanel>
      <div className="m-4">
        <StaticMap
          coordinates={[merinio.longitude, merinio.latitude]}
          theme={theme}
        />
      </div>
      <div>
        <pre>{JSON.stringify(features, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
