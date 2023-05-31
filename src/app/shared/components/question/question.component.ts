import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Answer } from '../../../models/answer';
import { Quiz } from '../../../models/quiz';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  imports: [CommonModule, NgFor],
  standalone: true,
})
export class QuestionComponent {
  currentAnswer: string = '';

  @Input({ required: true }) quiz!: Quiz;
  @Output() chooseAnswerEvent = new EventEmitter<Answer>();
  @Input() checkAnswers = true;

  constructor() {}

  onChooseAnswer(option: string) {
    this.currentAnswer = option;
    this.chooseAnswerEvent.emit({ question: this.quiz.question, option });
  }
}
