import { Component, OnInit } from '@angular/core';
import { QuestionComponent } from '../../../shared/components/question/question.component';
import { QuizStorageService } from '../../../services/quiz-storage.service';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { QuizScoreComponent } from '../../../shared/components/quiz-score/quiz-score.component';
import { Question } from '../../../models/question';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css'],
  imports: [RouterModule, NgFor, QuestionComponent, QuizScoreComponent],
  providers: [QuizStorageService],
  standalone: true,
})
export class QuizResultComponent implements OnInit {
  questions: Question[] = [];
  total: number = 0;
  arrangements: number = 0;

  constructor(private readonly storeService: QuizStorageService) {}

  ngOnInit() {
    this.questions = this.storeService.getData() ?? [];

    this.total = this.questions.length;

    this.questions.forEach((q) => {
      if (q.correctAnswer === q.choosenAnswer) this.arrangements++;
    });
  }
}
