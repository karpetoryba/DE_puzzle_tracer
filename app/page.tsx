"use client";

import React from "react";
import { MazeGrid } from "@/components/game/MazeGrid";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import Timer from "@/components/game/Timer";
import { useGameState } from "@/hooks/useGameState";
import { levels } from "@/lib/levels";
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
    <div className="min-h-screen w-full bg-black">
      <Rive
        src="animations/esd_gameplay_hand.riv"
        className="h-[100vh] w-full"
        animations={["Idle-Loop_01", "Cursor_ExpandFlower"]}
        stateMachines={["State Machine 1"]}
      />
      <h2 className="absolute top-32 left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-white">
        Level {currentLevel + 1}
      </h2>
      <div className="absolute top-32 left-[calc(50%-150px)] transform -translate-x-1/2">
        <Timer isActive={isActive} onTimerUpdate={setTimer} />
      </div>
      <h2 className="absolute top-32 left-[calc(50%+150px)] transform -translate-x-1/2 text-2xl font-semibold text-white">
        Move Count: {moveCount}
      </h2>
      <p className="absolute top-40 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground">
        {gameState.isComplete ? "Complete!" : "In Progress..."}
      </p>
      <Button
        variant="outline"
        onClick={handleReset}
        className="absolute top-48 left-1/2 transform -translate-x-1/2"
      >
        Reset Level
      </Button>
      {gameState.isComplete && (
        <Button
          onClick={handleNextLevel}
          disabled={currentLevel >= levels.length - 1}
          className="absolute top-56 left-1/2 transform -translate-x-1/2"
        >
          Next Level
        </Button>
      )}
      {gameState.errorMessage && (
        <Alert
          variant="destructive"
          className="absolute top-64 left-1/2 transform -translate-x-1/2"
        >
          <AlertDescription>{gameState.errorMessage}</AlertDescription>
        </Alert>
      )}
      {gameState.isComplete && (
        <Alert className="absolute top-72 left-1/2 transform -translate-x-1/2 bg-green-100 border-green-200">
          <Trophy className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">
            Congratulations! You&apos;ve completed this level!
          </AlertDescription>
        </Alert>
      )}
      <div className="absolute top-60 left-1/2 transform -translate-x-1/2">
        <div className="float">
          <MazeGrid
            level={levels[currentLevel]}
            onGameStateChange={setGameState}
            onFirstInput={handleFirstInput}
            onMove={handleMove}
            setCurrentLevel={setCurrentLevel}
            resetMoveCount={resetMoveCount}
          />
        </div>
      </div>{" "}
    </div>
  );
}
