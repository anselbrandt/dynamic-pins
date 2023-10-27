import React from "react";

interface RangeSliderProps {
  value: number;
  handleChange;
}
export const RangeSlider: React.FC<RangeSliderProps> = ({
  value,
  handleChange,
}) => {
  return (
    <>
      <label htmlFor="radius" className="form-label">
        <span>Radius: </span>
        <span>{value}</span>
      </label>
      <input
        type="range"
        className="form-range"
        min="0"
        max="200"
        id="radius"
        value={value}
        onChange={handleChange}
      />
    </>
  );
};
