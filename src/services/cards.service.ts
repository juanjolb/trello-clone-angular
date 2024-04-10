import { Injectable, signal } from '@angular/core';
import { Card } from '../types/card';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  cardsSubject = new BehaviorSubject<Card[]>([]);
  $cards = this.cardsSubject.asObservable();

  constructor() {
    this.cardsSubject.next(this.loadCards());
  }

  loadCards(): Card[] {
    const cards = localStorage.getItem('cards');
    return cards ? JSON.parse(cards) : [];
  }

  saveCards(): void {
    const cards = this.cardsSubject.value;
    localStorage.setItem('cards', JSON.stringify(cards));
  }

  createTask(cardId: string, task: string): void {
    const cards = this.cardsSubject.value;
    const cardIndex = cards.findIndex((card) => card.id === cardId);
    cards[cardIndex].tasks.push(task);
    this.cardsSubject.next(cards);
    this.saveCards();
  }

  deleteTask(cardId: string, taskIndex: number): void {
    const cards = this.cardsSubject.value;
    const cardIndex = cards.findIndex((card) => card.id === cardId);
    cards[cardIndex].tasks.splice(taskIndex, 1);
    this.cardsSubject.next(cards);
    this.saveCards();
  }

  addCard(card: Card): void {
    const cards = this.cardsSubject.value;
    this.cardsSubject.next([...cards, card]);
    this.saveCards();
  }

  deleteCard(cardId: string): void {
    const cards = this.cardsSubject.value;
    const updatedCards = cards.filter((card) => card.id !== cardId);
    this.cardsSubject.next(updatedCards);
    this.saveCards();
  }
}
