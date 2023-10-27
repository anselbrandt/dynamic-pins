import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as Constants from "../utils/Constants";
import { doubleClickZoom } from "../utils/doubleClickZoom";
import { circle } from "@turf/turf";

const CircleMode = { ...MapboxDraw.modes.draw_polygon };
const DEFAULT_RADIUS_IN_METERS = 100;

CircleMode.onSetup = function (opts) {
  const polygon = this.newFeature({
    type: Constants.geojsonTypes.FEATURE,
    properties: {
      isCircle: true,
      center: [],
    },
    geometry: {
      type: Constants.geojsonTypes.POLYGON,
      coordinates: [[]],
    },
  });

  this.addFeature(polygon);

  this.clearSelectedFeatures();
  doubleClickZoom.disable(this);
  this.updateUIClasses({ mouse: Constants.cursors.ADD });
  this.activateUIButton(Constants.types.POLYGON);
  this.setActionableState({
    trash: true,
  });

  return {
    initialRadiusInMeters:
      opts.initialRadiusInMeters || DEFAULT_RADIUS_IN_METERS,
    polygon,
    currentVertexPosition: 0,
  };
};

CircleMode.clickAnywhere = function (state, e) {
  if (state.currentVertexPosition === 0) {
    state.currentVertexPosition++;
    const center = [e.lngLat.lng, e.lngLat.lat];
    const circleFeature = circle(center, state.initialRadiusInMeters, {
      units: "meters",
    });
    state.polygon.incomingCoords(circleFeature.geometry.coordinates);
    state.polygon.properties.center = center;
    state.polygon.properties.radiusInMeters = state.initialRadiusInMeters;
  }
  return this.changeMode(Constants.modes.SIMPLE_SELECT, {
    featureIds: [state.polygon.id],
  });
};

export { CircleMode };
