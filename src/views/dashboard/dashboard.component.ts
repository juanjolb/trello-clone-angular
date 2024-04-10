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
    <dialog
      #newCardDialog
      class="dialog rounded bg-slate-400 backdrop:bg-opacity-50 backdrop:backdrop-filter backdrop:backdrop-blur-sm"
    >
      <form method="dialog" class="flex flex-col gap-4 p-6">
        <label
          for="title-input"
          class="block text-xl font-medium text-white text-center"
          >Set a card title</label
        >
        <input
          type="text"
          id="title-input"
          class="min-w-52 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <button
          (click)="addCard()"
          type="button"
          class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Create card
        </button>
      </form>
    </dialog>

    <section class="dashboard m-4">
      <div
        class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        @for(card of cards; track card.id) {
        <app-card-layout
          [card]="card"
          [style]="'order: ' + card.order"
        ></app-card-layout>
        }

        <div
          class="max-h-12 flex items-center gap-2 bg-slate-700 rounded py-2 px-4 cursor-pointer -order-first"
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
    // clear input
    (
      this.dialog.nativeElement.querySelector(
        '#title-input'
      ) as HTMLInputElement
    ).value = '';

    const cards = this.cardsService.cardsSubject.value;
    // find the highest id and increment by 1
    const id =
      cards.reduce((acc, card) => {
        const id = parseInt(card.id);
        return id > acc ? id : acc;
      }, 0) + 1;

    const newCard: Card = {
      id: id.toString(),
      title: title,
      tasks: [],
      bgColor: 'DEFAULT',
      order: cards.length,
    };

    this.cardsService.addCard(newCard);
    this.dialog.nativeElement.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
