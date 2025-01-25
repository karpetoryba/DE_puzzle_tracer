import React from "react";

interface ShowLevelProps {
  currentLevel: number;
  className?: string;
}

const ShowLevel: React.FC<ShowLevelProps> = ({ currentLevel, className }) => {
  return (
    <h2 className={`text-2xl font-semibold text-white ${className}`}>
      Level {currentLevel + 1}
    </h2>
  );
};

export default ShowLevel;
