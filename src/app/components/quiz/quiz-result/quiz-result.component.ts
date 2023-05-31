import { Component, OnInit } from '@angular/core';
import { QuestionComponent } from '../../../shared/components/question/question.component';
import { QuizStorageService } from '../../../services/quiz-storage.service';
import { RouterModule } from '@angular/router';
import { Quiz } from '../../../models/quiz';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css'],
  imports: [RouterModule, NgFor, QuestionComponent],
  providers: [QuizStorageService],
  standalone: true,
})
export class QuizResultComponent implements OnInit {
  quizzes: Quiz[] = [];

  constructor(private readonly storeService: QuizStorageService) {}

  ngOnInit() {
    this.quizzes = this.storeService.getData();
  }
}
