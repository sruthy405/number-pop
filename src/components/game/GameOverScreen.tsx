import { RotateCcw, Home } from 'lucide-react';

interface GameOverScreenProps {
  score: number;
  onPlayAgain: () => void;
  onHome: () => void;
}

const GameOverScreen = ({ score, onPlayAgain, onHome }: GameOverScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 animate-pop-in">
      <h2 className="game-title text-5xl md:text-6xl">Game Over!</h2>
      
      <div className="bg-card/90 rounded-2xl px-12 py-8 text-center">
        <p className="text-card-foreground text-lg mb-2">Your Score</p>
        <p className="text-6xl font-black text-game-yellow">{score}</p>
      </div>
      
      <div className="flex gap-4 mt-4">
        <button
          onClick={onPlayAgain}
          className="game-button-green flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Play Again
        </button>
        
        <button
          onClick={onHome}
          className="game-button-blue flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          Home
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;
