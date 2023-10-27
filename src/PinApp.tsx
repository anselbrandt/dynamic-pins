import React from "react";
import { useCallback, useRef } from "react";
import { Map } from "./components/PinMap";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

import { data } from "./data";
import ControlPanel from "./components/ControlPanel";
import { bbox } from "@turf/turf";
import { MapRef } from "react-map-gl";

import { Locations } from "./components/Locations";

const pad = 100;

function App() {
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

  const handleSelectLocation = useCallback((coordinates: GeoJSON.Position) => {
    const [lng, lat] = coordinates;
    mapRef.current?.flyTo({ center: [lng, lat], duration: 1000 });
  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      <Map
        width={600}
        height={400}
        data={data}
        initialViewState={initialViewState}
        mapRef={mapRef}
      />
      <ControlPanel>
        <Locations data={data} handleSelectLocation={handleSelectLocation} />
      </ControlPanel>
    </div>
  );
}

export default App;
