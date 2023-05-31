export type Quiz = {
  category: string;
  difficulty: QuizDifficulty;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  currentAnswer?: string;
};

export enum QuizDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}
