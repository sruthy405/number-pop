import type { Difficulty, Operation } from '@/types/game';
import { OPERATION_LABELS } from '@/types/game';

interface DifficultySelectProps {
  operation: Operation;
  onSelect: (difficulty: Difficulty) => void;
  onBack: () => void;
}

const difficulties: { id: Difficulty; label: string; range: string; buttonClass: string }[] = [
  { id: 'easy', label: 'EASY', range: '1-20', buttonClass: 'game-button-green' },
  { id: 'medium', label: 'MEDIUM', range: '1-30', buttonClass: 'game-button-blue' },
  { id: 'hard', label: 'HARD', range: '1-50', buttonClass: 'game-button-pink' },
];

const DifficultySelect = ({ operation, onSelect, onBack }: DifficultySelectProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 animate-pop-in">
      <h2 className="game-title text-4xl md:text-5xl">Select Difficulty</h2>
      <p className="text-foreground/80 text-lg">{OPERATION_LABELS[operation]}</p>
      
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {difficulties.map((diff) => (
          <button
            key={diff.id}
            onClick={() => onSelect(diff.id)}
            className={`${diff.buttonClass} flex flex-col items-center gap-1 min-w-[140px]`}
          >
            <span className="text-xl font-bold">{diff.label}</span>
            <span className="text-sm opacity-80">({diff.range})</span>
          </button>
        ))}
      </div>
      
      <button
        onClick={onBack}
        className="mt-6 text-foreground/80 hover:text-foreground underline transition-colors"
      >
        ← Back to Operations
      </button>
    </div>
  );
};

export default DifficultySelect;
