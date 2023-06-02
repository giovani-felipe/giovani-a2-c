import { QuizDifficulty } from '../../models/quiz';

export type QuizForm = {
  category: number;
  difficulty: QuizDifficulty;
};
