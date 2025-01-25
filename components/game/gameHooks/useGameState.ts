import { useState, useEffect } from "react";
import { levels } from "@/components/game/levels/levels";
import { GameState } from "@/types/game";

export function useGameState() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameState, setGameState] = useState<GameState>({
    currentPath: [levels[0].start],
    mirrorPath: [levels[0].mirrorStart || { x: 0, y: 0 }],
    isComplete: false,
    isValid: true,
    errorMessage: null,
  });

  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [moveCount, setMoveCount] = useState(0);

  useEffect(() => {
    if (hasStarted) {
      setIsActive(true);
    }
  }, [hasStarted]);

  const handleReset = () => {
    setGameState({
      currentPath: [levels[currentLevel].start],
      mirrorPath: [levels[currentLevel].mirrorStart || { x: 0, y: 0 }],
      isComplete: false,
      isValid: true,
      errorMessage: null,
    });
    setTimer(0);
    setHasStarted(false);
    setIsActive(false);
    setMoveCount(0);
  };

  const handleNextLevel = () => {
    if (currentLevel < levels.length - 1) {
      const nextLevel = currentLevel + 1;
      setCurrentLevel(nextLevel);
      setGameState({
        currentPath: [levels[nextLevel].start],
        mirrorPath: [levels[nextLevel].mirrorStart || { x: 0, y: 0 }],
        isComplete: false,
        isValid: true,
        errorMessage: null,
      });
      setTimer(0);
      setHasStarted(false);
      setIsActive(false);
      setMoveCount(0);
    }
  };

  const handleFirstInput = () => {
    if (!hasStarted) {
      setHasStarted(true);
    }
  };

  const handleMove = () => {
    setMoveCount((prevCount) => prevCount + 1);
  };

  const resetMoveCount = () => {
    setMoveCount(0);
  };

  return {
    currentLevel,
    gameState,
    timer,
    isActive,
    hasStarted,
    moveCount,
    setGameState,
    setTimer,
    setCurrentLevel,
    handleReset,
    handleNextLevel,
    handleFirstInput,
    handleMove,
    resetMoveCount,
  };
}
