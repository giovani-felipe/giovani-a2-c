import { Quiz } from '../../models/quiz';
import { QuizType } from '../../models/quiz';
import { QuizDTO, QuizTypeDTO } from '../dtos/quiz-response.dto';

export class QuizMapper {
  static toModel(dto: QuizDTO): Quiz {
    return {
      category: dto.category,
      correctAnswer: dto.correctAnswer,
      description: dto.description,
      incorrectAnswers: dto.incorrectAnswers,
      question: dto.question,
      type: QuizTypeMapper.toModel(dto.type),
    };
  }
}

export class QuizTypeMapper {
  static toModel(dto: QuizTypeDTO): QuizType {
    switch (dto) {
      case QuizTypeDTO.EASY:
        return QuizType.EASY;
      case QuizTypeDTO.MEDIUM:
        return QuizType.MEDIUM;
      case QuizTypeDTO.HARD:
        return QuizType.HARD;
      default:
        throw new Error(`QuizType not found: ${dto}`);
    }
  }

  static toDto(model: QuizType): QuizTypeDTO {
    switch (model) {
      case QuizType.EASY:
        return QuizTypeDTO.EASY;
      case QuizType.MEDIUM:
        return QuizTypeDTO.MEDIUM;
      case QuizType.HARD:
        return QuizTypeDTO.HARD;
      default:
        throw new Error(`QuizTypeDTO not found: ${model}`);
    }
  }
}
