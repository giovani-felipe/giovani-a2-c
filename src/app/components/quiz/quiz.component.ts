import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Quiz, QuizDifficulty } from '../../models/quiz';
import { Category } from '../../models/category';
import { QuizService } from '../../services/quiz.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormsModule,
  NgForm,
  Validators,
} from '@angular/forms';
import { QuestionComponent } from '../../shared/components/question/question.component';
import { QuizStorageService } from '../../services/quiz-storage.service';
import { RouterModule } from '@angular/router';
import { QuizForm } from './quiz.form';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  imports: [
    NgFor,
    NgIf,
    JsonPipe,
    AsyncPipe,
    FormsModule,
    RouterModule,
    QuestionComponent,
  ],
  providers: [QuizService, QuizStorageService],
  standalone: true,
})
export class QuizComponent implements OnInit, OnDestroy {
  QuizDifficulty = QuizDifficulty;

  questionFormArray: FormArray<FormControl<string>>;

  categories?: Observable<Category[]>;
  quizzes?: Observable<Quiz[]>;

  constructor(
    private readonly quizService: QuizService,
    private readonly storageService: QuizStorageService,
    formBuilder: FormBuilder
  ) {
    this.questionFormArray = formBuilder.array<FormControl<string>>([]);
  }

  public ngOnInit(): void {
    this.categories = this.quizService.getCategories();
    this.storageService.clear();
  }

  public ngOnDestroy(): void {
    let storageQuizzes = this.storageService.getData() ?? [];

    this.questionFormArray.controls.forEach((question, index) => {
      let quiz = storageQuizzes[index];

      if (quiz) quiz.currentAnswer = question.value;
    });

    this.storageService.save(storageQuizzes);
  }

  public onCreate(quizForm: NgForm): void {
    let { category, difficulty } = quizForm.value as QuizForm;
    this.questionFormArray.clear();
    if (category)
      this.quizzes = this.quizService
        .getQuizzes(category, difficulty ?? QuizDifficulty.EASY)
        .pipe(
          map((quizzes) => {
            let newQuizzes = quizzes.map((quiz, index) => {
              this.questionFormArray.push(
                new FormControl<string>('', {
                  nonNullable: true,
                  validators: [Validators.required],
                })
              );
              return {
                ...quiz,
                id: index,
                answers: this.sortAnswers(quiz.answers),
              };
            });

            this.storageService.save(newQuizzes);

            return newQuizzes;
          })
        );
  }

  private sortAnswers(answers: string[]): string[] {
    return answers.sort((a, b) => {
      return 0.5 - Math.random();
    });
  }
}
