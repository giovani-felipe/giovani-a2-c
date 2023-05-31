import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from '../models/category';
import { Quiz } from '../models/quiz';
import { QuizType } from '../models/quiz';
import { CategoryResponseDTO } from './dtos/category-response.dto';
import { QuizResponseDTO } from './dtos/quiz-response.dto';
import { CategoryMapper } from './mappers/category.mapper';
import { QuizMapper, QuizTypeMapper } from './mappers/quiz.mapper';

const URL = 'https://opentdb.com';

@Injectable()
export class QuizService {
  constructor(private readonly http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http
      .get<CategoryResponseDTO>(`${URL}/api_category.php`)
      .pipe(
        map((categoryResponseDto) =>
          categoryResponseDto.trivia_categories.map(CategoryMapper.toModel)
        )
      );
  }

  getQuizzes(
    categoryId: number,
    difficulty: QuizType,
    amount: number = 5,
    type: string = 'multiple'
  ): Observable<Quiz[]> {
    let params = new HttpParams()
      .append('category', categoryId)
      .append('difficulty', QuizTypeMapper.toDto(difficulty))
      .append('amount', amount)
      .append('type', type);

    return this.http
      .get<QuizResponseDTO>(`${URL}/api.php`, { params })
      .pipe(
        map((quizResponseDto) =>
          quizResponseDto.results.map(QuizMapper.toModel)
        )
      );
  }
}
