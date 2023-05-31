import { Injectable } from '@angular/core';
import { Quiz } from '../models/quiz';
import { StorageService } from './storage.service';

const QUIZ_KEY = 'quiz';

@Injectable()
export class QuizStorageService extends StorageService<Quiz[]> {
  constructor() {
    super(QUIZ_KEY);
  }
}
