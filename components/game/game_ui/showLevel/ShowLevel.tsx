import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

interface ShowLevelProps {
  currentLevel: number;
  className?: string;
}

const ShowLevel: React.FC<ShowLevelProps> = ({ currentLevel, className }) => {
  return (
    <div className={`show-level glassmorphism ${className}`}>
      <FontAwesomeIcon icon={faLayerGroup} className="mr-2 text-white" />
      <h2 className="text-2xl font-semibold text-white">
        Level: {currentLevel}
      </h2>
    </div>
  );
};

export default ShowLevel;