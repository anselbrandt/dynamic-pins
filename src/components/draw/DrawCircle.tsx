import { useCallback } from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useControl } from "react-map-gl";
import { CircleMode } from "./CircleMode";
import { DragCircleMode } from "./DragCircleMode";
import { DirectModeOverride } from "./DirectModeOverride";
import { SimpleSelectModeOverride } from "./SimpleSelectModeOverride";

export type OnCreate = (evt: { features: GeoJSON.Feature[] }) => void;
export type OnUpdate = (evt: {
  features: GeoJSON.Feature[];
  action: string;
}) => void;
export type OnDelete = (evt: { features: GeoJSON.Feature[] }) => void;

interface DrawCircleProps {
  setFeatures;
}

export const DrawCircle: React.FC<DrawCircleProps> = ({ setFeatures }) => {
  const onUpdate: OnUpdate = useCallback(
    (e) => {
      setFeatures((currFeatures) => {
        const newFeatures = { ...currFeatures };
        for (const f of e.features) {
          newFeatures[f.id] = f;
        }
        return newFeatures;
      });
    },
    [setFeatures]
  );

  const onDelete: OnDelete = useCallback(
    (e) => {
      setFeatures((currFeatures) => {
        const newFeatures = { ...currFeatures };
        for (const f of e.features) {
          delete newFeatures[f.id];
        }
        return newFeatures;
      });
    },
    [setFeatures]
  );

  const options: any = {
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true,
    },
    defaultMode: "draw_circle",
    userProperties: true,
    modes: {
      ...MapboxDraw.modes,
      draw_circle: CircleMode,
      drag_circle: DragCircleMode,
      direct_select: DirectModeOverride,
      simple_select: SimpleSelectModeOverride,
    },
  };
  useControl<MapboxDraw>(
    () => new MapboxDraw(options),
    ({ map }) => {
      map.on("draw.create", onUpdate);
      map.on("draw.update", onUpdate);
      map.on("draw.delete", onDelete);
    },
    ({ map }) => {
      map.off("draw.create", onUpdate);
      map.off("draw.update", onUpdate);
      map.off("draw.delete", onDelete);
    },
    {
      position: "top-left",
    }
  );

  return null;
};
