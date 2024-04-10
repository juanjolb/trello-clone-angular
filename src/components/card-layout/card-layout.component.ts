import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { Card } from '../../types/card';
import { AddIconComponent } from '../Icons/add-icon/add-icon.component';
import { CardsService } from '../../services/cards.service';
import { DeleteIconComponent } from '../Icons/delete-icon/delete-icon.component';
import { OptionsIconComponent } from '../Icons/options-icon/options-icon.component';
import { ColorPaletteComponent } from '../color-palette/color-palette.component';
import { LabelIconComponent } from '../Icons/label-icon/label-icon.component';
import { TasksService } from '../../services/tasks.service';
import { TasksComponent } from '../tasks/tasks.component';

@Component({
  selector: 'app-card-layout',
  standalone: true,
  imports: [
    AddIconComponent,
    DeleteIconComponent,
    LabelIconComponent,
    OptionsIconComponent,
    ColorPaletteComponent,
    TasksComponent,
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

    <div
      class="card text-black p-4 rounded"
      [style.backgroundColor]="
        card.bgColor === 'DEFAULT' ? '#94a3b8' : card.bgColor
      "
    >
      <header
        class="card-header font-bold mb-5 flex items-center justify-between relative"
      >
        <input
          #cardTitle
          type="text"
          class="bg-transparent"
          [value]="card.title"
          (change)="changeTitle()"
        />
        <app-options-icon
          class="w-6 cursor-pointer"
          (click)="showOptions = !showOptions"
        ></app-options-icon>
        @if (showOptions) {
        <div
          class="bg-white p-4 absolute top-6 -right-12 rounded flex flex-col gap-4 z-10"
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
            (selectedColor)="setBgColor($event)"
          ></app-color-palette>
        </div>
        }
      </header>
      <app-tasks [card]="card"></app-tasks>

      <footer
        class="card-footer mt-4 flex items-center gap-2 hover:cursor-pointer text-gray-800"
        (click)="showTaskModal()"
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
  @ViewChild('cardTitle') input!: ElementRef<HTMLInputElement>;

  cardsService = inject(CardsService);
  tasksService = inject(TasksService);
  showOptions: boolean = false;

  showTaskModal(): void {
    this.dialog.nativeElement.showModal();
  }

  changeTitle(): void {
    const { value } = this.input.nativeElement;
    if (!value) return;

    this.cardsService.renameCard(this.card.id, value);
  }

  addNewTask(): void {
    const input = this.dialog.nativeElement.querySelector('input');
    if (!input) return;

    // find the highest id and increment by 1
    const id =
      this.card.tasks.reduce((acc, task) => {
        const id = parseInt(task.id);
        return id > acc ? id : acc;
      }, 0) + 1;

    const task = {
      id: id.toString(),
      title: input.value,
      labels: [],
    };

    this.tasksService.createTask(this.card.id, task);
    input.value = '';
    this.dialog.nativeElement.close();
  }

  deleteCard(): void {
    const response = confirm('Are you sure you want to delete this card?');
    if (!response) return;
    this.cardsService.deleteCard(this.card.id);
  }

  setBgColor(color: string): void {
    this.showOptions = false;
    this.card.bgColor = color;
    this.cardsService.saveCards();
  }
}
