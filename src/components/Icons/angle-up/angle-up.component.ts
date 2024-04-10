import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-angle-up',
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
        d="m4.5 15.75 7.5-7.5 7.5 7.5"
      />
    </svg>
  `,
  styles: ``,
})
export class AngleUpComponent {
  @Input() class: string = '';
}
