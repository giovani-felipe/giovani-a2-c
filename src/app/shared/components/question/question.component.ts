import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Answer } from '../../../models/answer';
import { Quiz } from '../../../models/quiz';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  imports: [CommonModule, NgFor],
  standalone: true,
})
export class QuestionComponent implements OnInit {
  currentAnswer: string = '';

  @Input({ required: true }) quiz!: Quiz;
  @Output() chooseAnswerEvent = new EventEmitter<Answer>();
  @Input() checkAnswers = false;

  constructor() {}

  ngOnInit(): void {
    if (this.checkAnswers) this.currentAnswer = this.quiz?.currentAnswer ?? '';
  }

  onChooseAnswer(option: string) {
    if (!this.checkAnswers) {
      this.currentAnswer = option;
      this.chooseAnswerEvent.emit({ question: this.quiz.question, option });
    }
  }
}
