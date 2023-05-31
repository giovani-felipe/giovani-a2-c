import { Route } from '@angular/router';
import { QuizResultComponent } from './components/quiz/quiz-result/quiz-result.component';
import { QuizComponent } from './components/quiz/quiz.component';

export const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: QuizComponent,
  },
  {
    path: 'result',
    component: QuizResultComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
