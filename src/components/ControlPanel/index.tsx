import * as React from "react";
import styles from "./styles.module.css";

interface ControlPanelProps {
  children?: React.ReactNode;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ children }) => {
  return (
    <div className={styles.controlPanel}>
      <h3>Control Panel</h3>
      <p>Show only if map full width</p>
      <p>Not viewable in fullscreen mode</p>
      <div>{children}</div>
    </div>
  );
};

export default React.memo(ControlPanel);
