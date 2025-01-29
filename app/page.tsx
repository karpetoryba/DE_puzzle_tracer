"use client";

import "./globals.css";
import React, { useEffect, useState } from "react";
import { MazeGrid } from "@/components/game/game_ui/grid/MazeGrid";
import Timer from "@/components/game/game_ui/timer/Timer";
import { useGameState } from "@/components/game/gameHooks/useGameState";
import { levels } from "@/components/game/levels/levels";
import Rive from "@rive-app/react-canvas";
import MoveCounter from "@/components/game/game_ui/moveCounter/MoveCounter";
import ShowLevel from "@/components/game/game_ui/showLevel/ShowLevel";
import FormPlayer from "@/components/game/game_ui/formPlayer/FormPlayer";
import { Player } from "@/types/player";
import { time } from "console";

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

  const [formDisplayed, setFormDisplayed] = useState(true);
  const [gameFinished, setGameFinished] = useState(false);
  const [timeScore, setTimeScore] = useState(1);
  const [player, setPlayer] = useState<Player>({
    id: 0,
    score: 0,
  });

  const sendPlayer = () => {
    console.log("coucou");
  };

  const onSubmit = () => {
    setFormDisplayed(false);
  };

  const onPress = () => {
    console.log(player);
  };

  useEffect(() => {
    console.log(gameFinished);
    if (gameFinished) {
      fetch("https://app-user-ten.vercel.app/api/score/create", {
        method: "POST", // Méthode HTTP
        headers: {
          "Content-Type": "application/json", // Spécifie que l'on envoie du JSON
        },
        body: JSON.stringify({
          playerId: player.id,
          score: player.score,
          gameId: 4,
        }), // Conversion de l'objet en JSON
      }).then(() => {
        window.location.href =
          "https://irresistible-products-927490.framer.app/loose";
      });
      console.log(player);
    }
  }, [gameFinished, player]);

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
          onSubmit={onSubmit}
          setPlayer={setPlayer}
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
              textColor="text-white"
              isActive={isActive}
              onTimerUpdate={setTimer}
              onTimerEnd={sendPlayer} // Ajouté ici
              setTimeScore={setTimeScore}
              setGameFinished={setGameFinished}
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
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
