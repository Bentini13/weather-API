import React from "react";

import { TiWeatherCloudy } from "react-icons/ti";
import { TiWeatherDownpour } from "react-icons/ti";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TiWeatherShower } from "react-icons/ti";
import { TiWeatherSnow } from "react-icons/ti";
import { TiWeatherStormy } from "react-icons/ti";
import { TiWeatherSunny } from "react-icons/ti";

interface iconProps {
  weatherId: number;
  iconSize: number;
}

// API weather reference codes
const thunderstormCodes = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232];
const lightRainCodes = [300, 301, 302, 310, 311, 312, 313, 314, 321];
const rainCodes = [500, 501, 502, 503, 504, 511, 520, 521, 522, 531];
const snowCodes = [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622];
const partialCodes = [801, 802];
const cloudsCodes = [803, 804];
const clearCodes = [800];

export const WeatherIcon: React.FC<iconProps> = ({ weatherId, iconSize }) => {
  // Assign Weather code to icon
  let icon;

  if (thunderstormCodes.includes(weatherId)) {
    icon = <TiWeatherStormy size={String(iconSize) + "vh"} />;
  } else if (lightRainCodes.includes(weatherId)) {
    icon = <TiWeatherShower size={String(iconSize) + "vh"} />;
  } else if (rainCodes.includes(weatherId)) {
    icon = <TiWeatherDownpour size={String(iconSize) + "vh"} />;
  } else if (snowCodes.includes(weatherId)) {
    icon = <TiWeatherSnow size={String(iconSize) + "vh"} />;
  } else if (partialCodes.includes(weatherId)) {
    icon = <TiWeatherPartlySunny size={String(iconSize) + "vh"} />;
  } else if (cloudsCodes.includes(weatherId)) {
    icon = <TiWeatherCloudy size={String(iconSize) + "vh"} />;
  } else if (clearCodes.includes(weatherId)) {
    icon = <TiWeatherSunny size={String(iconSize) + "vh"} />;
  }
  return <>{icon}</>;
};
