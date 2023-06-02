import { QuestionDifficulty } from '../../models/question';

export type QuizForm = {
  category: number;
  difficulty: QuestionDifficulty;
};
