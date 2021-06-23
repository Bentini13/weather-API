import React from "react";
import styles from "./Fader.module.css";

interface FaderProps {
  children: any;
}

export const Fader: React.FC<FaderProps> = ({ children }) => {
  return <div className={styles.fader}>{children}</div>;
};
