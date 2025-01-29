import React, { useState, useEffect, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Player } from "@/types/player";
import scoring from "../../scoring/scoring";
import { levels } from "../../levels/levels";

interface TimerProps {
  isActive: boolean;
  textColor?: string;
  onTimerUpdate: (time: number) => void;
  onTimerEnd: () => void;
  setTimeScore: React.Dispatch<SetStateAction<number>>;
  setGameFinished: React.Dispatch<SetStateAction<boolean>>;
  setPlayer: React.Dispatch<React.SetStateAction<Player>>;
  moveCount: number;
}

const Timer: React.FC<TimerProps> = ({
  isActive,
  textColor = "text-white",
  onTimerUpdate,
  onTimerEnd,
  setTimeScore,
  setGameFinished,
  setPlayer,
  moveCount,
}) => {
  const [timer, setTimer] = useState(300000); // 5 minutes in milliseconds
  const [startTime, setStartTime] = useState<number | null>(null);

  const totalLevels = levels.length;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      if (!startTime) {
        setStartTime(Date.now());
      }
      interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - (startTime || currentTime);
        const timeLeft = 300000 - elapsedTime;

        if (timeLeft <= 0) {
          const playerScore = scoring(moveCount, currentTime);
          setPlayer((prevPlayer) => ({
            ...prevPlayer,
            score: playerScore,
          }));

          setTimeScore(0);

          clearInterval(interval!);
          setTimer(0);
          onTimerUpdate(0);

          setGameFinished(true);

          // Добавляем редирект на нужную страницу
        } else {
          setTimer(timeLeft);
          onTimerUpdate(timeLeft);
          setTimeScore(timeLeft);
        }
      }, 100);
    } else if (!isActive && timer !== 300000) {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
  }, [isActive, timer, onTimerUpdate, startTime, onTimerEnd, setTimeScore]);

  const [audio] = useState(() => {
    const bo = new Audio("/sounds/BO.mp3");
    bo.volume = 0.3;
    return bo;
  });

  useEffect(() => {
    if (isActive) {
      audio.play();
    }
  }, [isActive]);

  const minutes = Math.floor(timer / 60000)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((timer % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  const milliseconds = (timer % 1000).toFixed(0).padStart(3, "0").slice(0, 2);

  return (
    <div
      className={`timer glassmorphism ${textColor} text-2xl font-bold flex items-center justify-center`}
    >
      <FontAwesomeIcon icon={faClock} className="mr-2 scale-[75%]" />
      {minutes}:{seconds}:{milliseconds}
    </div>
  );
};

export default Timer;
