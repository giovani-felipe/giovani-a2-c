export type QuizDTO = {
  category: string;
  type: QuizTypeDTO;
  question: string;
  description: string;
  correctAnswer: string;
  incorrectAnswers: string[];
};

export enum QuizTypeDTO {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export type QuizResponseDTO = {
  response_code: number;
  results: QuizDTO[];
};
