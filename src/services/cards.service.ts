import { Injectable } from '@angular/core';
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
    const cards = this.getCards();
    localStorage.setItem('cards', JSON.stringify(cards));
  }

  addCard(card: Card): void {
    const cards = this.cardsSubject.value;
    this.cardsSubject.next([...cards, card]);
    this.saveCards();
  }

  deleteCard(cardId: string): void {
    const cards = this.getCards();
    const updatedCards = cards.filter((card) => card.id !== cardId);
    this.cardsSubject.next(updatedCards);
    this.saveCards();
  }

  renameCard(cardId: string, title: string): void {
    const cards = this.getCards();
    const cardIndex = cards.findIndex((card) => card.id === cardId);
    cards[cardIndex].title = title;
    this.cardsSubject.next(cards);
    this.saveCards();
  }

  getCards(): Card[] {
    return this.cardsSubject.value;
  }
}
