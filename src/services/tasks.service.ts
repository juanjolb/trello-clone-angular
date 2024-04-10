import { Injectable, inject } from '@angular/core';
import { CardsService } from './cards.service';
import { Task } from '../types/task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  cardsService = inject(CardsService);

  createTask(cardId: string, task: Task): void {
    const cards = this.cardsService.getCards();
    const cardIndex = cards.findIndex((card) => card.id === cardId);
    cards[cardIndex].tasks.push(task);
    this.cardsService.cardsSubject.next(cards);
    this.cardsService.saveCards();
  }

  deleteTask(cardId: string, taskIndex: number): void {
    const cards = this.cardsService.getCards();
    const cardIndex = cards.findIndex((card) => card.id === cardId);
    cards[cardIndex].tasks.splice(taskIndex, 1);
    this.cardsService.cardsSubject.next(cards);
    this.cardsService.saveCards();
  }

  addLabel(cardId: string, task: Task): void {
    const cards = this.cardsService.getCards();
    const cardIndex = cards.findIndex((card) => card.id === cardId);
    const taskIndex = cards[cardIndex].tasks.findIndex((t) => t.id === task.id);
    cards[cardIndex].tasks[taskIndex] = task;
    this.cardsService.cardsSubject.next(cards);
    this.cardsService.saveCards();
  }

  changeOrder(cardId: string, direction: 'up' | 'down', taskId: string): void {
    const cards = this.cardsService.getCards();
    const cardIndex = cards.findIndex((card) => card.id === cardId);
    const taskIndex = cards[cardIndex].tasks.findIndex(
      (task) => task.id === taskId
    );
    const nextTask = cards[cardIndex].tasks.findIndex(
      (task) => task.order === cards[cardIndex].tasks[taskIndex].order + 1
    );
    const previousTask = cards[cardIndex].tasks.findIndex(
      (task) => task.order === cards[cardIndex].tasks[taskIndex].order - 1
    );
    const order = cards[cardIndex].tasks[taskIndex].order;
    if (direction === 'up') {
      cards[cardIndex].tasks[taskIndex].order = order - 1;
      cards[cardIndex].tasks[previousTask].order = order;
    }
    if (direction === 'down') {
      cards[cardIndex].tasks[taskIndex].order = order + 1;
      cards[cardIndex].tasks[nextTask].order = order;
    }

    this.cardsService.cardsSubject.next(cards);
    this.cardsService.saveCards();
  }
}
