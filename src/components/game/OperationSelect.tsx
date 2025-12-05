import { Plus, Minus, X, Calculator, Radical, Shuffle, Divide } from 'lucide-react';
import type { Operation } from '@/types/game';

interface OperationSelectProps {
  onSelect: (operation: Operation) => void;
  onBack: () => void;
}

const operations: { id: Operation; label: string; icon: React.ReactNode; buttonClass: string }[] = [
  { id: 'addition', label: 'Addition', icon: <Plus className="w-6 h-6" />, buttonClass: 'game-button-green' },
  { id: 'subtraction', label: 'Subtraction', icon: <Minus className="w-6 h-6" />, buttonClass: 'game-button-blue' },
  { id: 'multiplication', label: 'Multiplication', icon: <X className="w-6 h-6" />, buttonClass: 'game-button-pink' },
  { id: 'square-root', label: 'Square & Square Root', icon: <Radical className="w-6 h-6" />, buttonClass: 'game-button-green' },
  { id: 'cube-root', label: 'Cube & Cube Root', icon: <Calculator className="w-6 h-6" />, buttonClass: 'game-button-blue' },
  { id: 'halves', label: 'Halves (½)', icon: <Divide className="w-6 h-6" />, buttonClass: 'game-button-pink' },
  { id: 'random', label: 'Random Mix', icon: <Shuffle className="w-6 h-6" />, buttonClass: 'game-button-green' },
];

const OperationSelect = ({ onSelect, onBack }: OperationSelectProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 animate-pop-in">
      <h2 className="game-title text-4xl md:text-5xl">Choose Operation</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {operations.map((op) => (
          <button
            key={op.id}
            onClick={() => onSelect(op.id)}
            className={`${op.buttonClass} flex items-center gap-3 text-lg min-w-[200px] justify-center`}
          >
            {op.icon}
            {op.label}
          </button>
        ))}
      </div>
      
      <button
        onClick={onBack}
        className="mt-6 text-foreground/80 hover:text-foreground underline transition-colors"
      >
        ← Back to Menu
      </button>
    </div>
  );
};

export default OperationSelect;
