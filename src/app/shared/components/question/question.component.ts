import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Quiz } from '../../../models/quiz';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  imports: [NgFor],
  standalone: true,
})
export class QuestionComponent implements OnInit {
  currentAnswer: string = '';

  @Input({ required: true }) quiz!: Quiz;
  @Input() checkAnswers = false;
  @Input() answerFormControl?: FormControl<string>;

  constructor() {}

  ngOnInit(): void {
    if (this.checkAnswers) this.currentAnswer = this.quiz?.currentAnswer ?? '';
  }

  onChooseAnswer(option: string) {
    if (this.answerFormControl) this.answerFormControl.setValue(option);
  }
}
