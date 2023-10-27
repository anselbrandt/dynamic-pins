import React from "react";

interface GeofenceSelectorProps {
  geofenceType: string;
  handleChange;
}

export const GeofenceSelector: React.FC<GeofenceSelectorProps> = ({
  geofenceType,
  handleChange,
}) => {
  return (
    <>
      <h4>Geofence Type</h4>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="geofenceType"
          id="circle"
          value="circle"
          checked={geofenceType === "circle"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="geofenceType1">
          Circle
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="geofenceType"
          id="polygon"
          value="polygon"
          checked={geofenceType === "polygon"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="geofenceType2">
          Polygon
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="geofenceType"
          id="none"
          value="none"
          checked={geofenceType === "none"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="geofenceType3">
          None
        </label>
      </div>
    </>
  );
};
