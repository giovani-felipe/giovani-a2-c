import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Question } from '../../../models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  imports: [NgFor, NgIf],
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

  public onSelectAnswer(option: string): void {
    if (!this.checkAnswers && this.answerFormControl)
      this.answerFormControl.setValue(option);
  }

  checkStatus(answer: string): string {
    return this.checkAnswers &&
      this.choosenAnswer !== this.question.correctAnswer &&
      this.choosenAnswer === answer
      ? 'btn-outline-danger'
      : 'btn-outline-success';
  }

  checkIfShouldBeChecked(answer: string): boolean {
    return (
      this.choosenAnswer === answer ||
      (this.checkAnswers && this.question.correctAnswer == answer)
    );
  }
}
