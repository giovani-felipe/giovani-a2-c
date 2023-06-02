import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Question } from '../../../models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  imports: [NgFor],
  standalone: true,
})
export class QuestionComponent implements OnInit {
  choosenAnswer: string = '';

  @Input({ required: true }) question!: Question;
  @Input() checkAnswers = false;
  @Input() answerFormControl?: FormControl<string>;

  constructor() {}

  ngOnInit(): void {
    if (this.checkAnswers)
      this.choosenAnswer = this.question?.choosenAnswer ?? '';
  }

  onSelectAnswer(option: string) {
    if (this.answerFormControl) this.answerFormControl.setValue(option);
  }
}
