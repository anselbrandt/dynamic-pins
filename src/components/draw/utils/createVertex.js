import * as Constants from "./Constants";

export const createVertex = (parentId, coordinates, path, selected) => {
  return {
    type: Constants.geojsonTypes.FEATURE,
    properties: {
      meta: Constants.meta.VERTEX,
      parent: parentId,
      coord_path: path,
      active: selected
        ? Constants.activeStates.ACTIVE
        : Constants.activeStates.INACTIVE,
    },
    geometry: {
      type: Constants.geojsonTypes.POINT,
      coordinates,
    },
  };
};
