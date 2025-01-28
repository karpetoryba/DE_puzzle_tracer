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
    isActive,
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
          <div className="absolute pointer-events-none top-20 left-1/2 transform -translate-x-1/2 flex space-x-8">
      <ShowLevel
        currentLevel={currentLevel}
        className="pointer-events-none"
      />
      <Timer
        isActive={isActive}
        onTimerUpdate={setTimer}
        textColor="text-white"
      />
      <MoveCounter
        moveCount={moveCount}
        className="pointer-events-none"
      />
    </div>
          <div className="absolute top-[20%] left-1/2 transform scale-[100%] -translate-x-1/2">
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
