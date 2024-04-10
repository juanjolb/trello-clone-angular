import { Component, Input, inject } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { TasksService } from '../../services/tasks.service';
import { Card } from '../../types/card';
import { LabelIconComponent } from '../Icons/label-icon/label-icon.component';
import { AddIconComponent } from '../Icons/add-icon/add-icon.component';
import { DeleteIconComponent } from '../Icons/delete-icon/delete-icon.component';
import { labels } from '../../types/labels';
import { AngleDownComponent } from '../Icons/angle-down/angle-down.component';
import { AngleUpComponent } from '../Icons/angle-up/angle-up.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    AddIconComponent,
    DeleteIconComponent,
    LabelIconComponent,
    AngleDownComponent,
    AngleUpComponent,
  ],
  template: `
    <div class="card-tasks flex flex-col gap-3">
      @for (task of card.tasks; track task.id) {

      <div
        class="card-task-item p-2 bg-slate-200 rounded shadow-md"
        [style]="'order: ' + task.order"
      >
        <div class="labels flex flex-wrap gap-x-2 ">
          @for (label of task.labels; track $index) {
          <div
            class="block py-1 px-2 text-sm font-semibold text-white rounded mb-2"
            [class]="getLabel(label)?.color"
          >
            {{ getLabel(label)?.title }}
          </div>
          }
        </div>
        <div class="flex items-center justify-between">
          <span>{{ task.title }}</span>
          <div class="card-actions flex gap-4 relative items-center">
            <div
              class="labels flex flex-wrap gap-2 bg-slate-100 rounded px-6 py-4 absolute top-6 w-56 shadow-md z-10 "
              [class]="showLabels === task.id ? 'block' : 'hidden'"
            >
              @for (label of LABELS_CONST; track $index) {
              <div
                class="block py-1 px-2 text-sm font-semibold text-white rounded cursor-pointer"
                [class]="label.color"
                (click)="manageLabel(task.id, label.id)"
              >
                {{ label.title }}
              </div>
              }
            </div>

            <app-label-icon
              class="w-5 cursor-pointer"
              (click)="showLabels = showLabels === task.id ? null : task.id"
            />
            <app-delete-icon
              class="w-5 cursor-pointer"
              (click)="deleteTask($index)"
            />
            <div class="sorting flex flex-col">
              @if (task.order !== 0) {
              <app-angle-up
                class="w-5 cursor-pointer hover:scale-110 "
                (click)="handleOrder('up', task.id)"
              />
              } @if (task.order !== card.tasks.length - 1) {
              <app-angle-down
                class="w-5 cursor-pointer hover:scale-110"
                (click)="handleOrder('down', task.id)"
              />
              }
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  `,
  styles: ``,
})
export class TasksComponent {
  @Input() card!: Card;
  showLabels: string | null = null;
  LABELS_CONST = labels;

  cardsService = inject(CardsService);
  tasksService = inject(TasksService);

  getLabel(id: string) {
    return labels.find((label) => label.id === id);
  }

  handleOrder(direction: 'up' | 'down', taskId: string): void {
    this.tasksService.changeOrder(this.card.id, direction, taskId);
  }

  deleteTask(index: number): void {
    this.tasksService.deleteTask(this.card.id, index);
  }

  manageLabel(taskId: string, labelId: string): void {
    const task = this.card.tasks.find((task) => task.id === taskId);
    if (!task) return;

    if (task.labels.includes(labelId)) {
      task.labels = task.labels.filter((id) => id !== labelId);
    } else {
      task.labels.push(labelId);
    }
    this.showLabels = null;
    this.tasksService.addLabel(this.card.id, task);
    this.cardsService.saveCards();
  }
}
