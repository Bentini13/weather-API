import React from "react";
import { HiArrowLeft } from "react-icons/hi";

interface BackArrowProps {
  handleClick: React.MouseEventHandler<SVGElement> | undefined;
}

export const BackArrow: React.FC<BackArrowProps> = ({ handleClick }) => {
  return <HiArrowLeft size={"4vh"} onClick={handleClick} />;
};
