export type QuizDTO = {
  category: string;
  difficulty: QuizDifficultyDTO;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export enum QuizDifficultyDTO {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export type QuizResponseDTO = {
  response_code: number;
  results: QuizDTO[];
};
