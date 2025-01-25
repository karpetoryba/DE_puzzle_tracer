import React from "react";

interface MoveCounterProps {
  moveCount: number;
  className?: string;
}

const MoveCounter: React.FC<MoveCounterProps> = ({ moveCount, className }) => {
  return (
    <h2 className={`text-2xl font-semibold text-white ${className}`}>
      Move Count: {moveCount}
    </h2>
  );
};

export default MoveCounter;
