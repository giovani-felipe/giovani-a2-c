import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
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
import { Question, QuestionDifficulty } from '../../models/question';

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
export class QuizComponent implements OnInit, OnDestroy {
  QuestionDifficulty = QuestionDifficulty;

  questionFormArray: FormArray<FormControl<string>>;

  categories?: Observable<Category[]>;
  questions?: Observable<Question[]>;

  constructor(
    private readonly quizService: QuizService,
    private readonly storageService: QuizStorageService,
    formBuilder: FormBuilder
  ) {
    this.questionFormArray = formBuilder.array<FormControl<string>>([]);
  }

  public ngOnInit(): void {
    this.storageService.clear();
    this.categories = this.quizService.getCategories();
  }

  public ngOnDestroy(): void {
    let storageQuizzes = this.storageService.getData() ?? [];

    this.questionFormArray.controls.forEach((question, index) => {
      let quiz = storageQuizzes[index];

      if (quiz) quiz.choosenAnswer = question.value;
    });

    this.storageService.save(storageQuizzes);
  }

  public onCreate(quizForm: NgForm): void {
    let { category, difficulty } = quizForm.value as QuizForm;
    this.questionFormArray.clear();
    if (category)
      this.questions = this.quizService
        .getQuestions(category, difficulty ?? QuestionDifficulty.EASY)
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
