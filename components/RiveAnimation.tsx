import React, { useMemo } from "react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

interface RiveAnimationProps {
  src: string; // Chemin vers le fichier .riv
  autoplay?: boolean; // Indique si l'animation doit démarrer automatiquement
  className?: string; // Optionnel : Ajouter des styles
  animations?: string[]; // Liste des animations à jouer
  stateMachines?: string[]; // Liste des machines d'état à utiliser
}

const RiveAnimation: React.FC<RiveAnimationProps> = ({
  src,
  autoplay = true,
  className = "",
  animations = [],
  stateMachines = [],
}) => {
  const layout = useMemo(
    () =>
      new Layout({
        fit: Fit.Contain, // Ajustez selon vos besoins
        alignment: Alignment.Center,
      }),
    []
  );

  const { RiveComponent } = useRive({
    src,
    autoplay,
    layout,
    animations,
    stateMachines,
  });

  return <RiveComponent className={className} />;
};

export default RiveAnimation;