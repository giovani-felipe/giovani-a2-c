export type Quiz = {
  category: string;
  type: QuizType;
  question: string;
  description: string;
  correctAnswer: string;
  incorrectAnswers: string[];
};

export enum QuizType {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}
