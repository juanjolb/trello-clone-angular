import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-color-palette',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-wrap gap-2">
      @for (color of bgColors; track $index) {
      <button
        class="w-5 h-5 rounded-full border-2 border-white hover:scale-150"
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
    '#c3cedd',
    '#89afb7',
    '#bd98a5',
    '#b5adb0',
    '#ebe1e5d9',
    '#dbd9b9',
    '#d9c8b2',
  ];
}
