import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    <header>
      <nav class="flex justify-between p-5 bg-slate-800 text-lg font-bold">
        <h1>Trello clone</h1>
        <p>Juanjo Lozano</p>
      </nav>
    </header>
  `,
  styles: ``,
})
export class HeaderComponent {}
