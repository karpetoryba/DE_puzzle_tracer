"use client";

import React from "react";
import { MazeGrid } from "@/components/game/MazeGrid";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import Timer from "@/components/game/Timer";
import { useGameState } from "@/hooks/useGameState";
import { levels } from "@/lib/levels";
import RiveAnimation from "@/components/RiveAnimation";
import Rive from "@rive-app/react-canvas";

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

  return (
    <div className="min-h-screen bg-background">
        <Rive
          src="animations/esd_gameplay.riv"
          className="h-[100vh]"
          animations={["Idle-Loop_01", "Cursor_ExpandFlower"]}
          stateMachines={["Gameplay"]}
        />
        <div className="absolute top-32 w-full flex flex-col items-center justify-center">
          <div className="h-fit w-2/4 space-y-8">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="flex flex-row justify-center items-center space-x-4">
                  <h2 className="text-2xl font-semibold text-white">Level {currentLevel + 1}</h2>
                  <Timer isActive={isActive} onTimerUpdate={setTimer} />
                  <h2 className="text-2xl font-semibold text-white">
                    Move Count: {moveCount}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  {gameState.isComplete ? "Complete!" : "In Progress..."}
                </p>
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
                  Congratulations! You&apos;ve completed this level!
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
    </div>
  );
}