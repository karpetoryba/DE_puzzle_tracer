"use client";

import React, { useEffect } from "react";
import { MazeGrid } from "@/components/game/MazeGrid";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import Timer from "@/components/game/Timer";
import { useGameState } from "@/hooks/useGameState";
import { levels } from "@/lib/levels";

export default function Home() {
  const {
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
  } = useGameState();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (clientX - centerX) * 0.05;
      const moveY = (clientY - centerY) * 0.05;
  
      document.documentElement.style.setProperty('--move-x', `${moveX}px`);
      document.documentElement.style.setProperty('--move-y', `${moveY}px`);
    };
  
    window.addEventListener("mousemove", handleMouseMove);
  
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background p-8 bg-game interactive">
      <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8 interactive">
       
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">Interface {currentLevel + 1}</h2>
            <Timer isActive={isActive} onTimerUpdate={setTimer} />
            <h2 className="text-2xl font-semibold">
              Déplacements : {moveCount}
            </h2>
          </div>

          <div className="space-x-2">
            <Button variant="outline" onClick={handleReset}>
              Reset Level
            </Button>
            {gameState.isComplete && (
              <Button
                onClick={handleNextLevel}
                disabled={currentLevel >= levels.length - 1}
              >
                Next Level
              </Button>
            )}
          </div>
        </div>

        {gameState.errorMessage && (
          <Alert variant="destructive">
            <AlertDescription>{gameState.errorMessage}</AlertDescription>
          </Alert>
        )}

        {gameState.isComplete && (
          <Alert className="bg-green-100 border-green-200">
            <Trophy className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">
              Bravo ! Tu as réussi l'interface {currentLevel + 1} en {timer} secondes
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-center">
          <MazeGrid
            level={levels[currentLevel]}
            onGameStateChange={setGameState}
            onFirstInput={handleFirstInput}
            onMove={handleMove}
            setCurrentLevel={setCurrentLevel}
            resetMoveCount={resetMoveCount}
          />
        </div>

        
      </div>
    </div>
  );
}