import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz, QuizDifficulty } from '../../models/quiz';
import { Category } from '../../models/category';
import { QuizService } from '../../services/quiz.service';
import { FormsModule } from '@angular/forms';
import { QuestionComponent } from '../../shared/components/quiz-list/question.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  imports: [CommonModule, AsyncPipe, FormsModule, QuestionComponent],
  providers: [QuizService],
  standalone: true,
})
export class QuizComponent implements OnInit {
  QuizDifficulty = QuizDifficulty;

  categoryId: number = 0;
  difficulty?: QuizDifficulty;

  categories?: Observable<Category[]>;
  quizzes?: Observable<Quiz[]>;

  constructor(private readonly quizService: QuizService) {}

  ngOnInit(): void {
    this.categories = this.quizService.getCategories();
  }

  onCreate(): void {
    this.quizzes = this.quizService.getQuizzes(
      this.categoryId,
      this.difficulty ?? QuizDifficulty.EASY
    );
  }
}
