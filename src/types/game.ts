export type Operation = 'addition' | 'subtraction' | 'multiplication' | 'square-root' | 'cube-root' | 'halves' | 'random';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameConfig {
  operation: Operation;
  difficulty: Difficulty;
  maxNumber: number;
  timeLimit: number;
}

export interface Question {
  text: string;
  answer: number;
  options: number[];
}

export interface Bubble {
  id: number;
  value: number;
  x: number;
  y: number;
  color: string;
}

export const DIFFICULTY_RANGES: Record<Difficulty, { max: number; time: number }> = {
  easy: { max: 20, time: 15 },
  medium: { max: 30, time: 12 },
  hard: { max: 50, time: 10 },
};

export const OPERATION_LABELS: Record<Operation, string> = {
  addition: 'Addition',
  subtraction: 'Subtraction',
  multiplication: 'Multiplication',
  'square-root': 'Square & Square Root',
  'cube-root': 'Cube & Cube Root',
  halves: 'Halves (½)',
  random: 'Random Mix',
};

export const CORE_OPERATIONS: Operation[] = ['addition', 'subtraction', 'multiplication', 'square-root', 'cube-root', 'halves'];

export const BUBBLE_COLORS = [
  'hsl(210, 80%, 55%)',
  'hsl(145, 70%, 45%)',
  'hsl(330, 80%, 60%)',
  'hsl(45, 100%, 55%)',
  'hsl(280, 70%, 50%)',
  'hsl(25, 100%, 55%)',
  'hsl(180, 70%, 50%)',
];
