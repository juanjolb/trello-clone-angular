import {
  Component,
  ElementRef,
  Input,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { Card } from '../../types/card';
import { AddIconComponent } from '../Icons/add-icon/add-icon.component';
import { CardsService } from '../../services/cards.service';
import { DeleteIconComponent } from '../Icons/delete-icon/delete-icon.component';
import { OptionsIconComponent } from '../Icons/options-icon/options-icon.component';
import { ColorPaletteComponent } from '../color-palette/color-palette.component';

@Component({
  selector: 'app-card-layout',
  standalone: true,
  imports: [
    AddIconComponent,
    DeleteIconComponent,
    OptionsIconComponent,
    ColorPaletteComponent,
  ],
  template: `
    <dialog #newTaskDialog class="dialog rounded bg-slate-400">
      <form method="dialog" class="flex flex-col gap-4 p-6">
        <label
          for="task-input"
          class="block  text-xl font-medium text-center text-white"
          >Add new task</label
        >
        <input
          type="text"
          id="task-input"
          class="min-w-52 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <button
          (click)="addNewTask()"
          type="button"
          class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Add
        </button>
      </form>
    </dialog>

    <div class="card text-black p-4 rounded" [style.backgroundColor]="bgColor">
      <header
        class="card-header font-bold mb-5 flex items-center justify-between relative"
      >
        <span>{{ card.title }}</span>
        <app-options-icon
          class="w-6 cursor-pointer"
          (click)="showOptions = !showOptions"
        ></app-options-icon>
        @if (showOptions) {
        <div
          class="bg-white p-4 absolute top-6 -right-12 rounded flex flex-col gap-4"
        >
          <button
            class="flex items-center gap-2 justify-center"
            (click)="deleteCard()"
          >
            <span>Delete card</span>
            <app-delete-icon class="w-5"></app-delete-icon>
          </button>
          <hr />
          <app-color-palette
            (selectedColor)="(bgColor = $event) && (showOptions = false)"
          ></app-color-palette>
        </div>
        }
      </header>

      <div class="card-tasks flex flex-col gap-3">
        @for (task of card.tasks; track $index) {
        <div
          class="flex items-center justify-between card-task p-2 bg-slate-200 rounded shadow-md"
        >
          <span>{{ task }}</span>
          <app-delete-icon
            class="w-5 cursor-pointer"
            (click)="deleteTask($index)"
          />
        </div>
        }
      </div>

      <footer
        class="card-footer mt-4 flex items-center gap-2 hover:cursor-pointer text-gray-800"
        (click)="showModal()"
      >
        <app-add-icon class="w-6 h-6" class="w-5" />
        <span>Add new task</span>
      </footer>
    </div>
  `,
  styles: ``,
})
export class CardLayoutComponent {
  @Input({ required: true }) card!: Card;
  @ViewChild('newTaskDialog') dialog!: ElementRef<HTMLDialogElement>;

  cardsService = inject(CardsService);
  showOptions: boolean = false;
  bgColor: string = '#94a3b8';

  showModal(): void {
    this.dialog.nativeElement.showModal();
  }

  addNewTask(): void {
    const input = this.dialog.nativeElement.querySelector('input');
    if (!input) return;

    const task = input.value;
    this.cardsService.createTask(this.card.id, task);
    input.value = '';
    this.dialog.nativeElement.close();
  }

  deleteTask(index: number): void {
    this.cardsService.deleteTask(this.card.id, index);
  }

  deleteCard(): void {
    this.cardsService.deleteCard(this.card.id);
  }
}
