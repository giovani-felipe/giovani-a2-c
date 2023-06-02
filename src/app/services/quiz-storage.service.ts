import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { StorageService } from './storage.service';

const QUIZ_KEY = 'quiz';

@Injectable()
export class QuizStorageService extends StorageService<Question[]> {
  constructor() {
    super(QUIZ_KEY);
  }
}
