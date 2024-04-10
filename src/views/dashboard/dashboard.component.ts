import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Card } from '../../types/card';
import { CardLayoutComponent } from '../../components/card-layout/card-layout.component';
import { AddIconComponent } from '../../components/Icons/add-icon/add-icon.component';
import { CardsService } from '../../services/cards.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardLayoutComponent, AddIconComponent],
  template: `
    <dialog #newCardDialog class="dialog rounded bg-slate-400">
      <form method="dialog" class="flex flex-col gap-4 p-6">
        <label for="title-input" class="block  text-xl font-medium text-white"
          >Title</label
        >
        <input
          type="text"
          id="title-input"
          class="min-w-52 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <button
          (click)="addCard()"
          type="button"
          class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Add
        </button>
      </form>
    </dialog>

    <section class="dashboard m-4">
      <div
        class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        @for(card of cards; track card.id) {
        <app-card-layout [card]="card"></app-card-layout>
        }

        <div
          class="max-h-12 flex items-center gap-2 bg-slate-700 rounded py-2 px-4 cursor-pointer"
          (click)="openDialog()"
        >
          <app-add-icon class="w-5 text-white"></app-add-icon>
          <span>Add new card</span>
        </div>
      </div>
    </section>
  `,
  styles: ``,
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('newCardDialog') dialog!: ElementRef<HTMLDialogElement>;

  cards: Card[] = [];
  cardsService = inject(CardsService);
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.cardsService.$cards.subscribe((cards) => (this.cards = cards))
    );
  }

  openDialog(): void {
    this.dialog.nativeElement.showModal();
  }

  addCard(): void {
    const { value: title } = this.dialog.nativeElement.querySelector(
      '#title-input'
    ) as HTMLInputElement;
    if (!title) return;

    const newCard: Card = {
      id: this.cards.length.toString(),
      title: title,
      tasks: [],
    };

    this.cardsService.addCard(newCard);
    this.dialog.nativeElement.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
