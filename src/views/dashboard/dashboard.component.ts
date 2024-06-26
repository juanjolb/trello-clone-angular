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

import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardLayoutComponent, AddIconComponent, CdkDropList, CdkDrag],
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
          class="focus:ring-2 focus:ring-black text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Create card
        </button>
      </form>
    </dialog>

    <section class="dashboard m-4">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
        cdkDropList
        cdkDropListOrientation="horizontal"
        (cdkDropListDropped)="drop($event)"
      >
        @for(card of cards; track card.id) {
        <app-card-layout cdkDrag [card]="card"></app-card-layout>
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
    this.cardsService.cardsSubject.next(this.cards);
    this.cardsService.saveCards();
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

    const newCard: Card = {
      id: crypto.randomUUID(),
      title: title,
      tasks: [],
      bgColor: 'DEFAULT',
    };

    this.cardsService.addCard(newCard);
    this.dialog.nativeElement.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
