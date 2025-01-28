import React, { useState, useEffect, SetStateAction } from "react";

interface TimerProps {
  isActive: boolean;
  textColor?: string;
  onTimerUpdate: (time: number) => void;
  onTimerEnd: () => void;
  setTimeScore: React.Dispatch<SetStateAction<number>>;
}

const Timer: React.FC<TimerProps> = ({
  isActive,
  textColor = "text-white",
  onTimerUpdate,
  onTimerEnd,
  setTimeScore,
}) => {
  const [timer, setTimer] = useState(300000); // 5 minutes in milliseconds
  const [startTime, setStartTime] = useState<number | null>(null);

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
          clearInterval(interval!);
          setTimer(0);
          onTimerUpdate(0);

          // Appel de la fonction onTimerEnd
          if (onTimerEnd) {
            onTimerEnd();
          }
          // Добавляем редирект на нужную страницу
          window.location.href =
            "https://irresistible-products-927490.framer.app/loose";
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

  const minutes = Math.floor(timer / 60000)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((timer % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  const milliseconds = (timer % 1000).toFixed(0).padStart(3, "0").slice(0, 2);

  return (
    <div className={`timer ${textColor} text-2xl font-bold`}>
      {minutes}:{seconds}:{milliseconds}
    </div>
  );
};

export default Timer;
