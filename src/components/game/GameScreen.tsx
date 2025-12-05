import { useState, useEffect, useCallback, useRef } from 'react';
import { Volume2, VolumeX, HelpCircle, Home } from 'lucide-react';
import type { Operation, Difficulty, Question, Bubble } from '@/types/game';
import { DIFFICULTY_RANGES, BUBBLE_COLORS, CORE_OPERATIONS } from '@/types/game';
import { useGameSounds } from '@/hooks/useGameSounds';

interface GameScreenProps {
  operation: Operation;
  difficulty: Difficulty;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onHelp: () => void;
  onHome: () => void;
  onGameOver: (score: number) => void;
}

const generateQuestion = (operation: Operation, maxNumber: number, difficulty: Difficulty): Question => {
  let text = '';
  let answer = 0;
  
  const actualOperation = operation === 'random' 
    ? CORE_OPERATIONS[Math.floor(Math.random() * CORE_OPERATIONS.length)]
    : operation;
  
  switch (actualOperation) {
    case 'addition': {
      const a = Math.floor(Math.random() * maxNumber) + 1;
      const b = Math.floor(Math.random() * maxNumber) + 1;
      text = `${a} + ${b} = ?`;
      answer = a + b;
      break;
    }
    case 'subtraction': {
      const a = Math.floor(Math.random() * maxNumber) + 1;
      const b = Math.floor(Math.random() * a) + 1;
      text = `${a} - ${b} = ?`;
      answer = a - b;
      break;
    }
    case 'multiplication': {
      const limitedMax = Math.min(maxNumber, 50);
      const a = Math.floor(Math.random() * limitedMax) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      text = `${a} × ${b} = ?`;
      answer = a * b;
      break;
    }
    case 'square-root': {
      const limitedMax = Math.min(maxNumber, 50);
      const isSquare = Math.random() < 0.5;
      if (isSquare) {
        const base = Math.floor(Math.random() * limitedMax) + 1;
        text = `${base}² = ?`;
        answer = base * base;
      } else {
        const base = Math.floor(Math.random() * limitedMax) + 1;
        const square = base * base;
        text = `√${square} = ?`;
        answer = base;
      }
      break;
    }
    case 'cube-root': {
      const limitedMax = Math.min(maxNumber, 30);
      const isCube = Math.random() < 0.5;
      if (isCube) {
        const base = Math.floor(Math.random() * limitedMax) + 1;
        text = `${base}³ = ?`;
        answer = base * base * base;
      } else {
        const base = Math.floor(Math.random() * limitedMax) + 1;
        const cube = base * base * base;
        text = `∛${cube} = ?`;
        answer = base;
      }
      break;
    }
    case 'halves': {
      // Difficulty controls decimal types:
      // Easy: only whole numbers (½ of 10, ½ of 8)
      // Medium: whole numbers + .5 decimals (½ of 7.5)
      // Hard: all decimals including .25 and .75
      const limitedMax = Math.min(maxNumber, 50);
      const rand = Math.random();
      
      if (difficulty === 'easy') {
        // Only whole numbers
        const num = Math.floor(Math.random() * limitedMax) + 1;
        text = `½ of ${num} = ?`;
        answer = num / 2;
      } else if (difficulty === 'medium') {
        if (rand < 0.6) {
          // Whole numbers
          const num = Math.floor(Math.random() * limitedMax) + 1;
          text = `½ of ${num} = ?`;
          answer = num / 2;
        } else {
          // .5 decimals
          const whole = Math.floor(Math.random() * limitedMax) + 1;
          const num = whole + 0.5;
          text = `½ of ${num} = ?`;
          answer = num / 2;
        }
      } else {
        // Hard: all decimal types
        if (rand < 0.4) {
          const num = Math.floor(Math.random() * limitedMax) + 1;
          text = `½ of ${num} = ?`;
          answer = num / 2;
        } else if (rand < 0.7) {
          const whole = Math.floor(Math.random() * limitedMax) + 1;
          const num = whole + 0.5;
          text = `½ of ${num} = ?`;
          answer = num / 2;
        } else {
          const whole = Math.floor(Math.random() * limitedMax) + 1;
          const decimal = Math.random() < 0.5 ? 0.25 : 0.75;
          const num = whole + decimal;
          text = `½ of ${num} = ?`;
          answer = num / 2;
        }
      }
      break;
    }
  }
  
  // Generate 10 options including the answer (4 initial + 6 more)
  const isDecimalAnswer = answer % 1 !== 0;
  const options = new Set<number>([answer]);
  
  if (isDecimalAnswer) {
    // For decimal answers, generate options with similar decimal patterns
    const wholePart = Math.floor(answer);
    const possibleDecimals = [0, 0.25, 0.5, 0.75];
    let attempts = 0;
    
    while (options.size < 10 && attempts < 100) {
      attempts++;
      const offsetWhole = Math.floor(Math.random() * 8) - 4;
      const newDecimal = possibleDecimals[Math.floor(Math.random() * possibleDecimals.length)];
      const option = Math.max(0.25, wholePart + offsetWhole + newDecimal);
      if (option !== answer) options.add(option);
    }
  } else {
    const offsetRange = answer > 100 ? Math.max(10, Math.floor(answer * 0.2)) : Math.max(5, Math.floor(answer * 0.3) + 3);
    let attempts = 0;
    while (options.size < 10 && attempts < 100) {
      attempts++;
      const offset = Math.floor(Math.random() * offsetRange * 2) - offsetRange;
      const option = Math.max(0, answer + offset);
      if (option !== answer) options.add(option);
    }
  }
  
  // Shuffle and return - first 4 will be initial bubbles (ensure answer is in first 4)
  const allOptions = Array.from(options);
  const answerIndex = allOptions.indexOf(answer);
  
  // Move answer to a random position in first 4 if it's not there
  if (answerIndex >= 4) {
    const swapIndex = Math.floor(Math.random() * 4);
    [allOptions[swapIndex], allOptions[answerIndex]] = [allOptions[answerIndex], allOptions[swapIndex]];
  }
  
  // Shuffle first 4 and remaining separately, then combine
  const first4 = allOptions.slice(0, 4).sort(() => Math.random() - 0.5);
  const remaining = allOptions.slice(4).sort(() => Math.random() - 0.5);
  
  return { text, answer, options: [...first4, ...remaining] };
};

// Check if two bubbles overlap
const checkOverlap = (x1: number, y1: number, x2: number, y2: number, minDistance: number): boolean => {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy) < minDistance;
};

// Find a non-overlapping position for a bubble
const findNonOverlappingPosition = (
  existingBubbles: Bubble[],
  containerWidth: number,
  containerHeight: number,
  bubbleSize: number,
  padding: number
): { x: number; y: number } | null => {
  const minDistance = bubbleSize + 15; // Minimum gap between bubbles
  const maxAttempts = 50;
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const x = padding + Math.random() * (containerWidth - bubbleSize - padding * 2);
    const y = padding + Math.random() * (containerHeight - bubbleSize - padding * 2);
    
    let overlaps = false;
    for (const bubble of existingBubbles) {
      if (checkOverlap(x, y, bubble.x, bubble.y, minDistance)) {
        overlaps = true;
        break;
      }
    }
    
    if (!overlaps) {
      return { x, y };
    }
  }
  
  return null; // Could not find a non-overlapping position
};

// Generate initial 4 bubbles with non-overlapping positions
const generateInitialBubbles = (
  options: number[],
  containerWidth: number,
  containerHeight: number
): Bubble[] => {
  const bubbleSize = 70;
  const padding = 25;
  const bubbles: Bubble[] = [];
  
  // Define 4 zones for initial bubbles - well spaced
  const zones = [
    { xMin: 0.08, xMax: 0.35, yMin: 0.08, yMax: 0.35 },   // Top left
    { xMin: 0.55, xMax: 0.85, yMin: 0.08, yMax: 0.35 },   // Top right
    { xMin: 0.08, xMax: 0.35, yMin: 0.55, yMax: 0.85 },   // Bottom left
    { xMin: 0.55, xMax: 0.85, yMin: 0.55, yMax: 0.85 },   // Bottom right
  ];
  
  // Take first 4 options for initial bubbles
  const initialOptions = options.slice(0, 4);
  
  initialOptions.forEach((value, index) => {
    const zone = zones[index];
    const xPercent = zone.xMin + Math.random() * (zone.xMax - zone.xMin);
    const yPercent = zone.yMin + Math.random() * (zone.yMax - zone.yMin);
    
    const x = Math.max(padding, Math.min(
      containerWidth * xPercent - bubbleSize / 2,
      containerWidth - bubbleSize - padding
    ));
    const y = Math.max(padding, Math.min(
      containerHeight * yPercent - bubbleSize / 2,
      containerHeight - bubbleSize - padding
    ));
    
    bubbles.push({
      id: index,
      value,
      x,
      y,
      color: BUBBLE_COLORS[index % BUBBLE_COLORS.length],
    });
  });
  
  return bubbles;
};

const GAME_DURATION = 60;
const MAX_BUBBLES = 10;
const BUBBLE_SPAWN_INTERVAL = 600; // ms between new bubble spawns

const GameScreen = ({
  operation,
  difficulty,
  soundEnabled,
  onToggleSound,
  onHelp,
  onHome,
  onGameOver,
}: GameScreenProps) => {
  const config = DIFFICULTY_RANGES[difficulty];
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [question, setQuestion] = useState<Question | null>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [visibleBubbleCount, setVisibleBubbleCount] = useState(4);
  const [shake, setShake] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [clickedBubbleId, setClickedBubbleId] = useState<number | null>(null);
  const [wrongFeedback, setWrongFeedback] = useState<{ show: boolean; correctAnswer: number | null }>({ show: false, correctAnswer: null });
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const playAreaRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const bubbleSpawnRef = useRef<NodeJS.Timeout | null>(null);
  const scoreRef = useRef(0);
  const allBubblesRef = useRef<Bubble[]>([]);
  
  const { playCorrectSound, playWrongSound, playGameOverSound } = useGameSounds(soundEnabled);

  // Generate all bubble positions upfront (including positions for future bubbles)
  const generateAllBubblePositions = useCallback((options: number[], width: number, height: number): Bubble[] => {
    const bubbleSize = 70;
    const padding = 25;
    
    // Generate initial 4 bubbles
    const initialBubbles = generateInitialBubbles(options, width, height);
    
    // Generate positions for remaining bubbles (5-10)
    const remainingOptions = options.slice(4);
    remainingOptions.forEach((value, idx) => {
      const position = findNonOverlappingPosition(initialBubbles, width, height, bubbleSize, padding);
      if (position) {
        initialBubbles.push({
          id: 4 + idx,
          value,
          x: position.x,
          y: position.y,
          color: BUBBLE_COLORS[(4 + idx) % BUBBLE_COLORS.length],
        });
      }
    });
    
    return initialBubbles;
  }, []);

  const generateNewQuestion = useCallback(() => {
    const newQuestion = generateQuestion(operation, config.max, difficulty);
    setQuestion(newQuestion);
    setVisibleBubbleCount(4); // Reset to 4 visible bubbles
    
    if (playAreaRef.current) {
      const { width, height } = playAreaRef.current.getBoundingClientRect();
      const allBubbles = generateAllBubblePositions(newQuestion.options, width, height);
      allBubblesRef.current = allBubbles;
      setBubbles(allBubbles.slice(0, 4)); // Show only first 4 initially
    }
  }, [operation, config, difficulty, generateAllBubblePositions]);

  // Spawn additional bubbles over time
  useEffect(() => {
    if (isProcessing || !question) return;
    
    bubbleSpawnRef.current = setInterval(() => {
      setVisibleBubbleCount(prev => {
        if (prev >= MAX_BUBBLES) {
          if (bubbleSpawnRef.current) clearInterval(bubbleSpawnRef.current);
          return prev;
        }
        const newCount = prev + 1;
        setBubbles(allBubblesRef.current.slice(0, newCount));
        return newCount;
      });
    }, BUBBLE_SPAWN_INTERVAL);

    return () => {
      if (bubbleSpawnRef.current) clearInterval(bubbleSpawnRef.current);
    };
  }, [question, isProcessing]);

  useEffect(() => {
    generateNewQuestion();
  }, [generateNewQuestion]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          if (bubbleSpawnRef.current) clearInterval(bubbleSpawnRef.current);
          playGameOverSound();
          onGameOver(scoreRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (bubbleSpawnRef.current) clearInterval(bubbleSpawnRef.current);
    };
  }, [onGameOver, playGameOverSound]);

  const handleBubbleClick = useCallback((value: number, bubbleId: number) => {
    if (!question || isProcessing) return;

    setClickedBubbleId(bubbleId);
    setTimeout(() => setClickedBubbleId(null), 400);

    // Clear bubble spawn interval when processing
    if (bubbleSpawnRef.current) clearInterval(bubbleSpawnRef.current);

    if (value === question.answer) {
      setIsProcessing(true);
      try {
        playCorrectSound();
      } catch (e) {
        console.log('Sound error:', e);
      }
      setScore((prev) => prev + 1);
      
      setTimeout(() => {
        generateNewQuestion();
        setIsProcessing(false);
      }, 150);
    } else {
      setIsProcessing(true);
      try {
        playWrongSound();
      } catch (e) {
        console.log('Sound error:', e);
      }
      setShake(true);
      setWrongFeedback({ show: true, correctAnswer: question.answer });
      
      setTimeout(() => {
        setShake(false);
        setWrongFeedback({ show: false, correctAnswer: null });
        generateNewQuestion();
        setIsProcessing(false);
      }, 800);
    }
  }, [question, isProcessing, playCorrectSound, playWrongSound, generateNewQuestion]);

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto gap-3 p-3 sm:p-4">
      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-6 max-w-sm w-full animate-pop-in text-center">
            <h3 className="text-xl font-bold text-card-foreground mb-4">Exit Game?</h3>
            <p className="text-muted-foreground mb-6">Are you sure you want to exit? Your progress will be lost.</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="px-6 py-2 rounded-full bg-muted text-muted-foreground font-semibold hover:bg-muted/80 transition-colors"
              >
                No
              </button>
              <button
                onClick={onHome}
                className="game-button-pink px-6 py-2"
              >
                Yes, Exit
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Header */}
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <button onClick={() => setShowExitConfirm(true)} className="p-2 rounded-full bg-card/20 hover:bg-card/40 transition-colors">
          <Home className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
        </button>
        
        <div className="question-bar flex-1 text-center text-lg sm:text-2xl">
          {question?.text}
        </div>
        
        <div className="flex gap-1 sm:gap-2">
          <button onClick={onToggleSound} className="p-2 rounded-full bg-card/20 hover:bg-card/40 transition-colors">
            {soundEnabled ? <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" /> : <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />}
          </button>
          <button onClick={onHelp} className="p-2 rounded-full bg-card/20 hover:bg-card/40 transition-colors">
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
          </button>
        </div>
      </div>
      
      {/* Play Area */}
      <div
        ref={playAreaRef}
        className={`flex-1 bg-card rounded-2xl relative overflow-hidden min-h-[350px] sm:min-h-[400px] ${shake ? 'animate-shake' : ''}`}
      >
        {/* Wrong answer feedback overlay */}
        {wrongFeedback.show && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-destructive/20 backdrop-blur-sm animate-fade-in">
            <div className="bg-card p-4 sm:p-6 rounded-2xl text-center shadow-2xl">
              <div className="text-destructive font-bold text-lg sm:text-xl mb-2">Wrong!</div>
              <div className="text-card-foreground text-sm sm:text-base">
                Correct answer: <span className="font-bold text-primary text-lg sm:text-xl">{wrongFeedback.correctAnswer}</span>
              </div>
            </div>
          </div>
        )}
        
        {bubbles.map((bubble) => (
          <button
            key={bubble.id}
            className={`game-bubble ${clickedBubbleId === bubble.id ? 'bubble-clicked' : ''}`}
            style={{
              left: bubble.x,
              top: bubble.y,
              backgroundColor: bubble.color,
              animationDelay: bubble.id < 4 ? `${bubble.id * 0.1}s` : '0s',
            }}
            onClick={() => handleBubbleClick(bubble.value, bubble.id)}
            disabled={isProcessing}
          >
            <span className={`bubble-number ${bubble.value >= 1000 ? 'text-sm' : bubble.value >= 100 ? 'text-lg' : 'text-2xl'}`}>
              {bubble.value}
            </span>
          </button>
        ))}
      </div>
      
      {/* Footer */}
      <div className="timer-bar text-center py-2">
        <div className="text-lg sm:text-xl font-bold text-card-foreground">Time: {timeLeft}s</div>
        <div className="text-xs sm:text-sm text-secondary">
          Answer as many as you can in {GAME_DURATION} seconds!
        </div>
      </div>
      
      {/* Score display */}
      <div className="text-center text-foreground pb-2">
        <span className="text-base sm:text-lg">Score: </span>
        <span className="text-xl sm:text-2xl font-bold text-primary">{score}</span>
      </div>
    </div>
  );
};

export default GameScreen;
