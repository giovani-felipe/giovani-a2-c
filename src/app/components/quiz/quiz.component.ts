import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Quiz, QuizDifficulty } from '../../models/quiz';
import { Category } from '../../models/category';
import { QuizService } from '../../services/quiz.service';
import { FormsModule } from '@angular/forms';
import { QuestionComponent } from '../../shared/components/question/question.component';
import { QuizStorageService } from '../../services/quiz-storage.service';
import { Answer } from '../../models/answer';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    FormsModule,
    RouterModule,
    QuestionComponent,
  ],
  providers: [QuizService, QuizStorageService],
  standalone: true,
})
export class QuizComponent implements OnInit {
  QuizDifficulty = QuizDifficulty;

  showSubmit = false;

  categoryId?: number;
  difficulty?: QuizDifficulty;

  categories?: Observable<Category[]>;
  quizzes?: Observable<Quiz[]>;

  constructor(
    private readonly quizService: QuizService,
    private readonly storageService: QuizStorageService
  ) {}

  public ngOnInit(): void {
    this.categories = this.quizService.getCategories();
    this.storageService.clear();
  }

  public onCreate(): void {
    this.showSubmit = false;

    if (this.categoryId)
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
    let storageQuizzes = this.storageService.getData() ?? [];

    let quiz = storageQuizzes.find((q) => q.question === answer.question);

    if (quiz) quiz.currentAnswer = answer.option;

    this.storageService.save(storageQuizzes);

    let showSubmit = true;

    storageQuizzes.forEach((q) => {
      if (!q.currentAnswer) showSubmit = false;
    });

    this.showSubmit = showSubmit;
  }

  private sortAnswers(answers: string[]): string[] {
    let random = Math.round((Math.random() - 0.5) * 2);
    return answers.sort((a, b) => {
      return random;
    });
  }
}
