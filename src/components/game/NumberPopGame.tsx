import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import type { Operation, Difficulty } from '@/types/game';
import bgImage from '@/assets/bg.jpg';
import FloatingNumbers from './FloatingNumbers';
import MainMenu from './MainMenu';
import OperationSelect from './OperationSelect';
import DifficultySelect from './DifficultySelect';
import GameScreen from './GameScreen';
import GameOverScreen from './GameOverScreen';
import InstructionsModal from './InstructionsModal';
import HelpModal from './HelpModal';

type Screen = 'menu' | 'operation' | 'difficulty' | 'game' | 'gameover';

const NumberPopGame = () => {
  const [screen, setScreen] = useState<Screen>('menu');
  const [operation, setOperation] = useState<Operation | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [score, setScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleOperationSelect = (op: Operation) => {
    setOperation(op);
    setScreen('difficulty');
  };

  const handleDifficultySelect = (diff: Difficulty) => {
    setDifficulty(diff);
    setScreen('game');
  };

  const handleGameOver = (finalScore: number) => {
    setScore(finalScore);
    setScreen('gameover');
  };

  const handlePlayAgain = () => {
    setScreen('game');
  };

  const handleHome = () => {
    setScreen('menu');
    setOperation(null);
    setDifficulty(null);
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed relative overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Floating decorative numbers */}
      <FloatingNumbers />
      
      {/* Sound toggle (always visible) */}
      {screen !== 'game' && (
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="fixed bottom-6 left-6 p-3 rounded-full bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all z-40"
        >
          {soundEnabled ? (
            <Volume2 className="w-6 h-6 text-foreground" />
          ) : (
            <VolumeX className="w-6 h-6 text-foreground" />
          )}
        </button>
      )}
      
      {/* Main content */}
      <main className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {screen === 'menu' && (
          <MainMenu
            onPlay={() => setScreen('operation')}
            onInstructions={() => setShowInstructions(true)}
            onHelp={() => setShowHelp(true)}
          />
        )}
        
        {screen === 'operation' && (
          <OperationSelect
            onSelect={handleOperationSelect}
            onBack={() => setScreen('menu')}
          />
        )}
        
        {screen === 'difficulty' && operation && (
          <DifficultySelect
            operation={operation}
            onSelect={handleDifficultySelect}
            onBack={() => setScreen('operation')}
          />
        )}
        
        {screen === 'game' && operation && difficulty && (
          <GameScreen
            operation={operation}
            difficulty={difficulty}
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled(!soundEnabled)}
            onHelp={() => setShowHelp(true)}
            onHome={handleHome}
            onGameOver={handleGameOver}
          />
        )}
        
        {screen === 'gameover' && (
          <GameOverScreen
            score={score}
            onPlayAgain={handlePlayAgain}
            onHome={handleHome}
          />
        )}
      </main>
      
      {/* Modals */}
      {showInstructions && <InstructionsModal onClose={() => setShowInstructions(false)} />}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </div>
  );
};

export default NumberPopGame;
