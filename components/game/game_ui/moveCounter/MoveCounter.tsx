import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRunning } from "@fortawesome/free-solid-svg-icons";

interface MoveCounterProps {
  moveCount: number;
  className?: string;
}

const MoveCounter: React.FC<MoveCounterProps> = ({ moveCount, className }) => {
  return (
    <div className={`move-counter glassmorphism ${className}`}>
      <FontAwesomeIcon icon={faRunning} className="mr-2 text-white" />
      <h2 className="text-2xl font-semibold text-white">
        Actions: {moveCount}
      </h2>
    </div>
  );
};

export default MoveCounter;