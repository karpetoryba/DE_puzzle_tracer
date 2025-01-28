import { useState, useEffect } from "react";

interface TimerProps {
  isActive: boolean;
  textColor?: string;
  onTimerUpdate: (time: number) => void;
}

const Timer: React.FC<TimerProps> = ({
  isActive,
  textColor = "text-white",
  onTimerUpdate,
}) => {
  const [timer, setTimer] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    let interval: number | null = null; // Typé en number pour `window.setInterval`

    if (isActive) {
      if (!startTime) {
        setStartTime(Date.now());
      }
      interval = window.setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - (startTime || currentTime);
        setTimer(elapsedTime);
        onTimerUpdate(elapsedTime);
      }, 100);
    } else if (!isActive && timer !== 0) {
      if (interval) {
        clearInterval(interval);
      }
    }

    // Nettoyage de l'interval
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timer, onTimerUpdate, startTime]);

  // Calcul des minutes, secondes et millisecondes
  const minutes = Math.floor(timer / 60000)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((timer % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  const milliseconds = Math.floor((timer % 1000) / 10)
    .toString()
    .padStart(2, "0");

  return (
    <h2 className={`text-2xl font-semibold ${textColor}`}>
      Timer : {minutes}:{seconds}:{milliseconds}
    </h2>
  );
};

export default Timer;
