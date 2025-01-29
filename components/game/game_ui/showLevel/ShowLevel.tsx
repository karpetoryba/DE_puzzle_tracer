import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { levels } from "../../levels/levels";

interface ShowLevelProps {
  currentLevel: number;
  className?: string;
  setGameFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowLevel: React.FC<ShowLevelProps> = ({
  currentLevel,
  className,
  setGameFinished,
}) => {
  const totalLevels = levels.length;

  useEffect(() => {
    if (currentLevel > totalLevels) {
      setGameFinished(true);
    }
  }, [currentLevel]);

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
