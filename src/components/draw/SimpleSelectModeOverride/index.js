import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { createSupplementaryPoints } from "../utils/createSupplementaryPoints";
import { moveFeatures } from "../utils/moveFeatures";
import * as Constants from "../utils/Constants";
import { createSupplementaryPointsForCircle } from "../utils/createSupplementaryPointsForCircle";

const SimpleSelectModeOverride = MapboxDraw.modes.simple_select;

SimpleSelectModeOverride.dragMove = function (state, e) {
  // Dragging when drag move is enabled
  state.dragMoving = true;
  e.originalEvent.stopPropagation();

  const delta = {
    lng: e.lngLat.lng - state.dragMoveLocation.lng,
    lat: e.lngLat.lat - state.dragMoveLocation.lat,
  };

  moveFeatures(this.getSelected(), delta);

  this.getSelected()
    .filter((feature) => feature.properties.isCircle)
    .map((circle) => circle.properties.center)
    .forEach((center) => {
      center[0] += delta.lng;
      center[1] += delta.lat;
    });

  state.dragMoveLocation = e.lngLat;
};

SimpleSelectModeOverride.toDisplayFeatures = function (
  state,
  geojson,
  display
) {
  geojson.properties.active = this.isSelected(geojson.properties.id)
    ? Constants.activeStates.ACTIVE
    : Constants.activeStates.INACTIVE;
  display(geojson);
  this.fireActionable();
  if (
    geojson.properties.active !== Constants.activeStates.ACTIVE ||
    geojson.geometry.type === Constants.geojsonTypes.POINT
  )
    return;
  const supplementaryPoints = geojson.properties.user_isCircle
    ? createSupplementaryPointsForCircle(geojson)
    : createSupplementaryPoints(geojson);
  supplementaryPoints.forEach(display);
};

export { SimpleSelectModeOverride };
