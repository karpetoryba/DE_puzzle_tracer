"use client";

import "./globals.css";
import React, { useEffect, useState } from "react";
import { MazeGrid } from "@/components/game/game_ui/grid/MazeGrid";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import Timer from "@/components/game/game_ui/timer/Timer";
import { useGameState } from "@/components/game/gameHooks/useGameState";
import { levels } from "@/components/game/levels/levels";
import Rive from "@rive-app/react-canvas";
import MoveCounter from "@/components/game/game_ui/moveCounter/MoveCounter";
import ShowLevel from "@/components/game/game_ui/showLevel/ShowLevel";
import FormPlayer from "@/components/game/game_ui/formPlayer/FormPlayer";

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

      document.documentElement.style.setProperty("--move-x", `${moveX}px`);
      document.documentElement.style.setProperty("--move-y", `${moveY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const [formDisplayed, setFormDisplayed] = useState(true);

  return (
    <div className="min-h-screen w-full custom-cursor bg-transparent interactive">
      <Rive
        src="animations/esd_gameplay_hand.riv"
        className="h-[100vh] w-full scale-110"
        animations={["Idle-Loop_01", "Cursor_ExpandFlower"]}
        stateMachines={["State Machine 1"]}
      />

      {formDisplayed && (
        <FormPlayer
          classname="absolute left-[45%] bottom-[50%] float"
          onSubmit={() => setFormDisplayed(false)}
        />
      )}

      {!formDisplayed && (
        <>
          <ShowLevel
            currentLevel={currentLevel}
            className="absolute pointer-events-none top-32 left-1/2 transform -translate-x-1/2"
          />
          <div className="absolute pointer-events-none top-32 left-[calc(50%-150px)] transform -translate-x-1/2">
            <Timer isActive={isActive} onTimerUpdate={setTimer} />
          </div>
          <MoveCounter
            moveCount={moveCount}
            className="absolute pointer-events-none top-32 left-[calc(50%+150px)] transform -translate-x-1/2"
          />
          <p className="absolute pointer-events-none top-40 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground">
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
          </div>
        </>
      )}
    </div>
  );
}
