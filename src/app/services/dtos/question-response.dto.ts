export type QuestionDTO = {
  category: string;
  difficulty: QuestionDifficultyDTO;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export enum QuestionDifficultyDTO {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export type QuizResponseDTO = {
  response_code: number;
  results: QuestionDTO[];
};
