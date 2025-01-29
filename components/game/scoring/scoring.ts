const scoring = (playerMoves: number, timeLeft: number) => {
  const calculateMoves = () => {
    const totalMoves = playerMoves;
    const maxMoves = 99;
    const factor = 5;
    const extraMoves = totalMoves - maxMoves;

    return Math.max(0, 20 - Math.ceil(extraMoves / factor));
  };

  const calculateTime = () => {
    const maxTime = 300000;
    const bestTime = 37;
    const factor = (maxTime - bestTime) / 20;

    return Math.max(0, 20 - (timeLeft - bestTime) / factor);
  };

  const movesScore = calculateMoves();
  const timeScore = calculateTime();

  const playerScore = (movesScore * 2 + timeScore) / 3;

  return playerScore;
};

export default scoring;
