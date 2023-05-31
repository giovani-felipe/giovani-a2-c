export type Quiz = {
  category: string;
  difficulty: QuizDifficulty;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
};

export enum QuizDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}
