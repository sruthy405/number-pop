import { useState } from 'react';
import { X } from 'lucide-react';

interface HelpModalProps {
  onClose: () => void;
}

type TableType = 'multiplication' | 'square' | 'cube' | 'halves';

const HelpModal = ({ onClose }: HelpModalProps) => {
  const [activeTab, setActiveTab] = useState<TableType>('multiplication');

  const renderMultiplicationTable = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs pb-4">
      {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
        <div key={num} className="bg-muted/50 p-3 rounded-lg text-center">
          <div className="font-bold text-game-yellow text-base mb-2">{num}</div>
          <div className="text-muted-foreground text-[11px] leading-relaxed">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((m) => (
              <div key={m} className="py-0.5">{num}×{m}={num * m}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderSquareTable = () => (
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-3 pb-4">
      {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
        <div key={num} className="bg-muted/50 p-3 rounded-lg text-center">
          <div className="font-bold text-game-green text-sm">{num}²</div>
          <div className="text-card-foreground text-sm mt-1">{num * num}</div>
        </div>
      ))}
    </div>
  );

  const renderCubeTable = () => (
    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-3 pb-4">
      {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
        <div key={num} className="bg-muted/50 p-3 rounded-lg text-center">
          <div className="font-bold text-game-pink text-sm">{num}³</div>
          <div className="text-card-foreground text-sm mt-1">{num * num * num}</div>
        </div>
      ))}
    </div>
  );

  const renderHalvesTable = () => (
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-3 pb-4">
      {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
        <div key={num} className="bg-muted/50 p-3 rounded-lg text-center">
          <div className="font-bold text-game-cyan text-sm">½ of {num}</div>
          <div className="text-card-foreground text-sm mt-1">{num / 2}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-pop-in flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
          <h2 className="text-2xl font-bold text-card-foreground">Math Tables</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-full transition-colors">
            <X className="w-6 h-6 text-card-foreground" />
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 p-4 border-b border-border shrink-0">
          <button
            onClick={() => setActiveTab('multiplication')}
            className={`px-3 py-2 rounded-full font-semibold transition-all text-sm ${
              activeTab === 'multiplication' ? 'game-button-green' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Multiplication (1-50)
          </button>
          <button
            onClick={() => setActiveTab('square')}
            className={`px-3 py-2 rounded-full font-semibold transition-all text-sm ${
              activeTab === 'square' ? 'game-button-blue' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Square Root (1-50)
          </button>
          <button
            onClick={() => setActiveTab('cube')}
            className={`px-3 py-2 rounded-full font-semibold transition-all text-sm ${
              activeTab === 'cube' ? 'game-button-pink' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Cube Root (1-30)
          </button>
          <button
            onClick={() => setActiveTab('halves')}
            className={`px-3 py-2 rounded-full font-semibold transition-all text-sm ${
              activeTab === 'halves' ? 'bg-game-cyan text-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Halves (1-50)
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 overflow-auto flex-1">
          {activeTab === 'multiplication' && renderMultiplicationTable()}
          {activeTab === 'square' && renderSquareTable()}
          {activeTab === 'cube' && renderCubeTable()}
          {activeTab === 'halves' && renderHalvesTable()}
        </div>
        
        <div className="p-4 border-t border-border shrink-0">
          <button onClick={onClose} className="game-button-green w-full">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
