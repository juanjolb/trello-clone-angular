import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-angle-down',
  standalone: true,
  imports: [],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      [class]="class"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  `,
  styles: ``,
})
export class AngleDownComponent {
  @Input() class: string = '';
}