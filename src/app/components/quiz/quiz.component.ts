import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Quiz, QuizDifficulty } from '../../models/quiz';
import { Category } from '../../models/category';
import { QuizService } from '../../services/quiz.service';
import { FormsModule } from '@angular/forms';
import { QuestionComponent } from '../../shared/components/quiz-list/question.component';
import { QuizStorageService } from '../../services/quiz-storage.service';
import { Answer } from '../../models/answer';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  imports: [CommonModule, AsyncPipe, FormsModule, QuestionComponent],
  providers: [QuizService, QuizStorageService],
  standalone: true,
})
export class QuizComponent implements OnInit {
  QuizDifficulty = QuizDifficulty;

  categoryId: number = 0;
  difficulty?: QuizDifficulty;

  categories?: Observable<Category[]>;
  quizzes?: Observable<Quiz[]>;

  constructor(
    private readonly quizService: QuizService,
    private readonly storageService: QuizStorageService
  ) {}

  public ngOnInit(): void {
    this.categories = this.quizService.getCategories();
  }

  public onCreate(): void {
    this.quizzes = this.quizService
      .getQuizzes(this.categoryId, this.difficulty ?? QuizDifficulty.EASY)
      .pipe(
        map((quizzes) => {
          let newQuizzes = quizzes.map((quiz) => ({
            ...quiz,
            answers: this.sortAnswers(quiz.answers),
          }));

          this.storageService.save(newQuizzes);

          return newQuizzes;
        })
      );
  }

  public saveAnswer(answer: Answer) {
    let quizzes = this.storageService.getData();

    let quiz = quizzes.find((q) => q.question === answer.question);

    if (quiz) quiz.currentAnswer = answer.option;

    this.storageService.save(quizzes);
  }

  private sortAnswers(answers: string[]): string[] {
    let random = Math.round((Math.random() - 0.5) * 2);
    return answers.sort((a, b) => {
      return random;
    });
  }
}
