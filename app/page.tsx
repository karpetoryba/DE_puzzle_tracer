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
        <RiveAnimation
          src="animations/esd_gameplay.riv"
          autoplay={true}
          className="h-[100vh]"
        />
        
      <div className="absolute inset-0 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">Mirror Maze</h1>
          <p className="text-muted-foreground">
            Draw a path that works for both the original and mirrored maze
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">Level {currentLevel + 1}</h2>
            <Timer isActive={isActive} onTimerUpdate={setTimer} />
            <h2 className="text-2xl font-semibold">
              Move Count: {moveCount}
            </h2>
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

        <div className="text-sm text-muted-foreground">
          <h3 className="font-semibold mb-2">How to Play:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Click and drag to draw a path from the blue start to the green end
            </li>
            <li>
              A mirrored path will automatically appear from the purple start to
              the emerald end
            </li>
            <li>Both paths must avoid the red barriers</li>
            <li>You can backtrack by moving over your existing path</li>
            <li>
              Complete the level by reaching both end points simultaneously
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}