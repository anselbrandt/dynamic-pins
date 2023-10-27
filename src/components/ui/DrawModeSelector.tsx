import React from "react";

interface DrawModeSelectorProps {
  drawMode: string;
  handleChange;
}

export const DrawModeSelector: React.FC<DrawModeSelectorProps> = ({
  drawMode,
  handleChange,
}) => {
  return (
    <>
      <h4>Draw Mode</h4>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="drawMode"
          id="circle"
          value="circle"
          checked={drawMode === "circle"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="drawMode1">
          Circle
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="drawMode"
          id="polygon"
          value="polygon"
          checked={drawMode === "polygon"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="drawMode2">
          Polygon
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="drawMode"
          id="off"
          value="off"
          checked={drawMode === "off"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="drawMode3">
          Off
        </label>
      </div>
    </>
  );
};
