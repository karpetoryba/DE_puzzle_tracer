// components/BackgroundAudio.tsx
"use client";

import { useEffect, useRef } from "react";

interface BackgroundAudioProps {
  audioPath: string;
  volume?: number;
}

export default function BackgroundAudio({
  audioPath,
  volume = 0.5,
}: BackgroundAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Crée l'élément audio
    const audio = new Audio(audioPath);
    audioRef.current = audio;

    // Configure l'audio
    audio.loop = true;
    audio.volume = volume;

    // Fonction pour jouer l'audio après une interaction utilisateur
    const playAudio = () => {
      audio.play().catch((error) => {
        console.error("Erreur de lecture audio:", error);
      });
      // Retire les event listeners une fois que l'audio est lancé
      document.removeEventListener("click", playAudio);
      document.removeEventListener("keydown", playAudio);
      document.removeEventListener("touchstart", playAudio);
    };

    // Ajoute les event listeners pour la première interaction
    document.addEventListener("click", playAudio);
    document.addEventListener("keydown", playAudio);
    document.addEventListener("touchstart", playAudio);

    // Cleanup
    return () => {
      audio.pause();
      audio.currentTime = 0;
      document.removeEventListener("click", playAudio);
      document.removeEventListener("keydown", playAudio);
      document.removeEventListener("touchstart", playAudio);
    };
  }, [audioPath, volume]);

  return null;
}
