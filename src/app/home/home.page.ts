
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';

enum GameState {
  NotStarted,
  Started,
  Finished
}

interface QuestionResult {
  question: string;
  userAnswer: string;
  correctAnswer: number;
  isCorrect: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  hardMode: boolean = false;
  GameState = GameState;
  gameState: GameState = GameState.NotStarted;

  currentQuestion: string = '';
  currentQuestionNumber: number = 1;
  correctAnswerCount: number = 0;
  answer: number = 0;
  userAnswer: string = '';
  isFocused: boolean = false;
  questionHistory: QuestionResult[] = [];

  private timerSubscription!: Subscription;
  timeTaken: number = 0;
  accuracy: number = 0;

  startGame() {
    this.gameState = GameState.Started;
    this.currentQuestionNumber = 1;
    this.correctAnswerCount = 0;
    this.questionHistory = [];
    this.timeTaken = 0;
  
    this.timerSubscription = interval(1000).subscribe(() => {
      this.timeTaken++;
    });
    this.generateQuestion();
  }
  resetGame() {
    this.gameState = GameState.NotStarted;
  }

  generateQuestion() {
    const isHard = this.hardMode;
    const max = isHard ? 1000 : 100;
    const operatorCount = isHard ? 4 : 3;
    const operator = Math.floor(Math.random() * operatorCount);
    let a: number, b: number;

    switch (operator) {
      case 0:
        a = Math.floor(Math.random() * max) + 1;
        b = Math.floor(Math.random() * max) + 1;
        this.answer = a + b;
        this.currentQuestion = `${a} + ${b}`;
        break;
      case 1:
        a = Math.floor(Math.random() * max) + 1;
        b = Math.floor(Math.random() * a) + 1;
        this.answer = a - b;
        this.currentQuestion = `${a} - ${b}`;
        break;
      case 2:
        a = Math.floor(Math.random() * (isHard ? 100 : 10)) + 1;
        b = Math.floor(Math.random() * (isHard ? 10 : 10)) + 1;
        this.answer = a * b;
        this.currentQuestion = `${a} * ${b}`;
        break;
      case 3:
        const result = Math.floor(Math.random() * 100) + 1;
        b = Math.floor(Math.random() * 10) + 1;
        a = b * result;
        this.answer = result;
        this.currentQuestion = `${a} / ${b}`;
        break;
    }
  }

  submitAnswer() {
    let isCorrect = false;
    console.log('User answered:', this.userAnswer);
    if (parseFloat(this.userAnswer) == this.answer) {
      this.correctAnswerCount++;
      isCorrect = true;
      console.log('count: ', this.correctAnswerCount);
    }
    this.questionHistory.push({
      question: this.currentQuestion,
      userAnswer: this.userAnswer,
      correctAnswer: this.answer,
      isCorrect: isCorrect
    });
    if (this.correctAnswerCount == 20) {
      this.timerSubscription.unsubscribe();
      this.accuracy = Math.trunc(20 / this.currentQuestionNumber * 100);
      this.gameState = GameState.Finished;
    } else {
      this.userAnswer = '';
      this.currentQuestionNumber++;
      this.generateQuestion();
    }
  }

  onFocus() {
    this.isFocused = true;
  }
  onBlur() {
    this.isFocused = false;
  }
}