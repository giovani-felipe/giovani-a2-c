import { Component, OnInit } from '@angular/core';
import { QuestionComponent } from '../../../shared/components/question/question.component';
import { QuizStorageService } from '../../../services/quiz-storage.service';
import { RouterModule } from '@angular/router';
import { Quiz } from '../../../models/quiz';
import { NgFor } from '@angular/common';
import { QuizScoreComponent } from '../../../shared/components/quiz-score/quiz-score.component';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css'],
  imports: [RouterModule, NgFor, QuestionComponent, QuizScoreComponent],
  providers: [QuizStorageService],
  standalone: true,
})
export class QuizResultComponent implements OnInit {
  quizzes: Quiz[] = [];
  total: number = 0;
  arrangements: number = 0;

  constructor(private readonly storeService: QuizStorageService) {}

  ngOnInit() {
    this.quizzes = this.storeService.getData() ?? [];

    this.total = this.quizzes.length;

    this.quizzes.forEach((q) => {
      if (q.correctAnswer === q.currentAnswer) this.arrangements++;
    });
  }
}
