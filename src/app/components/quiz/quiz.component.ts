import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizType } from '../../models/quiz';
import { Category } from '../../models/category';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  imports: [CommonModule, AsyncPipe],
  providers: [QuizService],
  standalone: true,
})
export class QuizComponent implements OnInit {
  categories?: Observable<Category[]>;
  QuizType = QuizType;

  constructor(private readonly quizService: QuizService) {}

  ngOnInit() {
    this.categories = this.quizService.getCategories();
  }
}
