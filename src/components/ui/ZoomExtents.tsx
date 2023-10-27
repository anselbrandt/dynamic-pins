import React from "react";
interface ZoomExtentsProps {
  handleZoomExtents: () => void;
  theme: string;
}

export const ZoomExtents: React.FC<ZoomExtentsProps> = ({
  handleZoomExtents,
  theme,
}) => {
  return (
    <button onClick={handleZoomExtents} className={`btn btn-${theme} m-2`}>
      Zoom extents
    </button>
  );
};
