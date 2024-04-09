import { Component, OnInit } from '@angular/core';
import { Card } from '../../types/card';
import { CardLayoutComponent } from '../card-layout/card-layout.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardLayoutComponent],
  template: `
    <section
      class="dashboard grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-4"
    >
      @for(card of cards; track card.id) {
      <app-card-layout [card]="card"></app-card-layout>
      }
    </section>
  `,
  styles: ``,
})
export class DashboardComponent implements OnInit {
  cards: Card[] = [];

  ngOnInit(): void {
    this.setCards();
    this.cards = this.loadCards();
  }

  loadCards(): Card[] {
    const cards = localStorage.getItem('cards');
    return cards ? JSON.parse(cards) : [];
  }

  setCards(): void {
    const newCards: Card[] = [
      {
        id: '1',
        title: 'New card',
        tasks: ['Task 1', 'Task 2', 'Task 3'],
      },
      {
        id: '2',
        title: 'Another card',
        tasks: ['Task 1', 'Task 2', 'Task 3'],
      },
    ];
    localStorage.setItem('cards', JSON.stringify(newCards));
  }
}
