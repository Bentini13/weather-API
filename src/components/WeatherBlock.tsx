import React from "react";
import styles from "./WeatherBlock.module.css";
import { WeatherIcon } from "./WeatherIcon";

interface WeatherBlockProps {
  temp: number;
  day: number;
  weatherId: number;
}

// API references sunday as 0
const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const WeatherBlock: React.FC<WeatherBlockProps> = ({
  temp,
  day,
  weatherId,
}) => {
  return (
    <div className={styles.block}>
      <div className={styles.dayLabel}>{dayList[day]}</div>
      <WeatherIcon weatherId={weatherId} iconSize={8} />
      <div className={styles.tempLabel}>{temp + "°"}</div>
    </div>
  );
};
