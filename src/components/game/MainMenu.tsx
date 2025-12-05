import { Play, HelpCircle, BookOpen } from 'lucide-react';

interface MainMenuProps {
  onPlay: () => void;
  onInstructions: () => void;
  onHelp: () => void;
}

const MainMenu = ({ onPlay, onInstructions, onHelp }: MainMenuProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 animate-pop-in">
      <h1 className="game-title text-6xl md:text-8xl tracking-tight">
        NUMBER
      </h1>
      <h1 className="game-title text-7xl md:text-9xl tracking-tight -mt-4">
        POP
      </h1>
      
      <div className="flex flex-col gap-4 mt-8">
        <button
          onClick={onPlay}
          className="game-button-green flex items-center gap-3 text-xl animate-pulse-glow"
        >
          <Play className="w-6 h-6" fill="currentColor" />
          PLAY GAME
        </button>
        
        <button
          onClick={onInstructions}
          className="game-button-blue flex items-center gap-3 text-lg"
        >
          <BookOpen className="w-5 h-5" />
          Instructions
        </button>
        
        <button
          onClick={onHelp}
          className="game-button-pink flex items-center gap-3 text-lg"
        >
          <HelpCircle className="w-5 h-5" />
          Help & Tables
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
