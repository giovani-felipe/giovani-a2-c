import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Quiz } from '../../../models/quiz';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  imports: [CommonModule, NgFor],
  standalone: true,
})
export class QuestionComponent implements OnInit {
  @Input({ required: true }) quiz?: Quiz;

  answers?: string[];

  constructor() {}

  ngOnInit() {
    if (this.quiz?.incorrectAnswers)
      this.answers = this.sortAnswers([
        ...this.quiz?.incorrectAnswers,
        this.quiz?.correctAnswer,
      ]);
  }

  private sortAnswers(answers: string[]): string[] {
    let random = Math.round((Math.random() - 0.5) * 2);
    console.log(random);
    return answers.sort((a, b) => {
      return random;
    });
  }
}
