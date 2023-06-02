import { Question, QuestionDifficulty } from '../../models/question';
import {
  QuestionDifficultyDTO,
  QuestionDTO,
} from '../dtos/question-response.dto';

export class QuestionMapper {
  static toModel(dto: QuestionDTO): Question {
    return {
      category: dto.category,
      correctAnswer: dto.correct_answer,
      answers: [...dto.incorrect_answers, dto.correct_answer],
      question: dto.question,
      difficulty: QuestionDifficultyMapper.toModel(dto.difficulty),
    };
  }
}

export class QuestionDifficultyMapper {
  static toModel(dto: QuestionDifficultyDTO): QuestionDifficulty {
    switch (dto) {
      case QuestionDifficultyDTO.EASY:
        return QuestionDifficulty.EASY;
      case QuestionDifficultyDTO.MEDIUM:
        return QuestionDifficulty.MEDIUM;
      case QuestionDifficultyDTO.HARD:
        return QuestionDifficulty.HARD;
      default:
        throw new Error(`QuestionDifficulty not found: ${dto}`);
    }
  }

  static toDto(model: QuestionDifficulty): QuestionDifficultyDTO {
    switch (model) {
      case QuestionDifficulty.EASY:
        return QuestionDifficultyDTO.EASY;
      case QuestionDifficulty.MEDIUM:
        return QuestionDifficultyDTO.MEDIUM;
      case QuestionDifficulty.HARD:
        return QuestionDifficultyDTO.HARD;
      default:
        throw new Error(`QuestionDifficultyDTO not found: ${model}`);
    }
  }
}
