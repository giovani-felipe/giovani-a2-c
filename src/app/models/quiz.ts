export type Quiz = {
  id?: number;
  category: string;
  difficulty: QuizDifficulty;
  question: string;
  correctAnswer: string;
  answers: string[];
  currentAnswer?: string;
};

export enum QuizDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}
