import {
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Card } from '../../types/card';

@Component({
  selector: 'app-card-layout',
  standalone: true,
  imports: [],
  template: `
    <dialog #addDialog class="dialog rounded bg-slate-400">
      <form method="dialog" class="flex flex-col gap-4 p-6">
        <label
          for="default-input"
          class="block  text-xl font-medium text-center text-white"
          >Add new task</label
        >
        <input
          type="text"
          id="default-input"
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

    <div class="card text-black p-4 bg-slate-400 rounded">
      <header class="card-header font-bold mb-5">{{ card.title }}</header>
      <div class="card-tasks flex flex-col gap-3">
        @for (task of card.tasks; track card.id) {
        <div class="card-task p-2 bg-slate-200 rounded shadow-md">
          <span>{{ task }}</span>
        </div>
        }
      </div>
      <footer
        class="card-footer mt-4 flex items-center gap-2 hover:cursor-pointer text-gray-800"
        (click)="showModal()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          ></path>
        </svg>
        <span>Add new task</span>
      </footer>
    </div>
  `,
  styles: ``,
})
export class CardLayoutComponent {
  @Input({ required: true }) card!: Card;
  @ViewChild('addDialog') addDialog!: ElementRef<HTMLDialogElement>;

  showModal(): void {
    this.addDialog.nativeElement.showModal();
  }

  addNewTask(): void {
    const input = this.addDialog.nativeElement.querySelector('input');
    const task = input?.value;
    console.log(task);
    this.addDialog.nativeElement.close();
  }
}
