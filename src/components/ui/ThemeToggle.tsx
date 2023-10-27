import React from "react";
interface ThemeToggleProps {
  theme: string;
  handleSetTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  handleSetTheme,
}) => {
  return (
    <button className={`btn btn-${theme} m-2`} onClick={handleSetTheme}>
      {theme === "dark" ? (
        <i className="fa-solid fa-moon text-light" />
      ) : (
        <i className="fa-solid fa-brightness-low" />
      )}{" "}
      {`${theme} mode`}
    </button>
  );
};
