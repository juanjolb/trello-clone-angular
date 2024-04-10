import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-color-palette',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-wrap gap-2">
      @for (color of bgColors; track $index) {
      <button
        class="w-4 h-4"
        [style.backgroundColor]="color"
        (click)="selectedColor.emit(color)"
      ></button>
      }
    </div>
  `,
  styles: ``,
})
export class ColorPaletteComponent {
  @Output() selectedColor = new EventEmitter<string>();

  bgColors: string[] = [
    '#94a3b8',
    '#2f578f',
    '#306339',
    '#234028',
    '#444f35',
    '#6f706e',
    '#47434d',
    '#433952',
  ];
}
