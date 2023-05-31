import { Quiz } from '../../models/quiz';
import { QuizDifficulty } from '../../models/quiz';
import { QuizDTO, QuizDifficultyDTO } from '../dtos/quiz-response.dto';

export class QuizMapper {
  static toModel(dto: QuizDTO): Quiz {
    return {
      category: dto.category,
      correctAnswer: dto.correct_answer,
      answers: [...dto.incorrect_answers, dto.correct_answer],
      question: dto.question,
      difficulty: QuizDifficultyMapper.toModel(dto.difficulty),
    };
  }
}

export class QuizDifficultyMapper {
  static toModel(dto: QuizDifficultyDTO): QuizDifficulty {
    switch (dto) {
      case QuizDifficultyDTO.EASY:
        return QuizDifficulty.EASY;
      case QuizDifficultyDTO.MEDIUM:
        return QuizDifficulty.MEDIUM;
      case QuizDifficultyDTO.HARD:
        return QuizDifficulty.HARD;
      default:
        throw new Error(`QuizDifficulty not found: ${dto}`);
    }
  }

  static toDto(model: QuizDifficulty): QuizDifficultyDTO {
    switch (model) {
      case QuizDifficulty.EASY:
        return QuizDifficultyDTO.EASY;
      case QuizDifficulty.MEDIUM:
        return QuizDifficultyDTO.MEDIUM;
      case QuizDifficulty.HARD:
        return QuizDifficultyDTO.HARD;
      default:
        throw new Error(`QuizDifficultyDTO not found: ${model}`);
    }
  }
}
