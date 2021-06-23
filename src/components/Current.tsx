import React from "react";

import styles from "./Current.module.css";
import { WeatherIcon } from "./WeatherIcon";

interface CurrentProps {
  location: string;
  weatherId: number;
  currTemp: number;
}

export const Current: React.FC<CurrentProps> = ({
  location,
  weatherId,
  currTemp,
}) => {
  return (
    <div>
      <div className={styles.locationName}>{location}</div>
      <WeatherIcon weatherId={weatherId} iconSize={15} />
      <div className={styles.temp}>{currTemp + "°"}</div>
    </div>
  );
};
