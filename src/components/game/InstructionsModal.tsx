import { X } from 'lucide-react';

interface InstructionsModalProps {
  onClose: () => void;
}

const InstructionsModal = ({ onClose }: InstructionsModalProps) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl max-w-lg w-full max-h-[80vh] overflow-auto animate-pop-in">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-2xl font-bold text-card-foreground">How to Play</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-full transition-colors">
            <X className="w-6 h-6 text-card-foreground" />
          </button>
        </div>
        
        <div className="p-6 space-y-4 text-card-foreground">
          <div className="space-y-2">
            <h3 className="font-bold text-lg text-game-yellow">🎯 Objective</h3>
            <p>Find and tap the correct answer to the math question before time runs out!</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-bold text-lg text-game-green">📝 Game Modes</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Addition:</strong> Add two numbers</li>
              <li><strong>Subtraction:</strong> Subtract two numbers</li>
              <li><strong>Multiplication:</strong> Multiply numbers (tables up to 50)</li>
              <li><strong>Square & Square Root:</strong> Find squares and √ (up to 50²)</li>
              <li><strong>Cube & Cube Root:</strong> Find cubes and ∛ (up to 30³)</li>
              <li><strong>Halves (½):</strong> Find half of numbers (0.5, 0.25, etc.)</li>
              <li><strong>Random Mix:</strong> Random operations each question</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-bold text-lg text-game-blue">⚡ Difficulty Levels</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Easy:</strong> Numbers 1-20, 15 seconds</li>
              <li><strong>Medium:</strong> Numbers 1-30, 12 seconds</li>
              <li><strong>Hard:</strong> Numbers 1-50, 10 seconds</li>
            </ul>
            <p className="text-xs text-muted-foreground mt-2">
              <strong>Halves mode:</strong> Easy = whole numbers only, Medium = adds .5 decimals, Hard = includes .25/.75
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-bold text-lg text-game-pink">💡 Tips</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Use the Help button to view math tables</li>
              <li>Each correct answer gives you 1 point</li>
              <li>Wrong answers shake the screen but don't end the game</li>
              <li>Timer resets after each correct answer</li>
            </ul>
          </div>
        </div>
        
        <div className="p-4 border-t border-border">
          <button onClick={onClose} className="game-button-green w-full">
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;
