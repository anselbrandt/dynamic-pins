import React from "react";
interface ResponsiveToggleProps {
  theme: string;
  isResponsive: boolean;
  handleSetResponsive: () => void;
}

export const ResponsiveToggle: React.FC<ResponsiveToggleProps> = ({
  theme,
  isResponsive,
  handleSetResponsive,
}) => {
  return (
    <button className={`btn btn-${theme} m-2`} onClick={handleSetResponsive}>
      {isResponsive ? "Fixed Size" : "Responsive"}
    </button>
  );
};
