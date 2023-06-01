import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-score',
  templateUrl: './quiz-score.component.html',
  styleUrls: ['./quiz-score.component.css'],
  standalone: true,
})
export class QuizScoreComponent implements OnInit {
  @Input({ required: true }) total!: number;
  @Input({ required: true }) failures!: number;

  constructor() {}

  ngOnInit() {}

  checkStatus() {
    if (this.failures - this.total < 2) return 'bg-danger';
    else if (this.failures - this.total < 4) return 'bg-warning';
    else return 'bg-success';
  }
}
