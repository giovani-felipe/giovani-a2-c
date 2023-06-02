export type Question = {
  id?: number;
  category: string;
  difficulty: QuestionDifficulty;
  question: string;
  correctAnswer: string;
  answers: string[];
  choosenAnswer?: string;
};

export enum QuestionDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}
