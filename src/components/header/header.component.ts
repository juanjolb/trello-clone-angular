import { Component } from '@angular/core';
import { GithubIconComponent } from '../Icons/github-icon/github-icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [GithubIconComponent],
  template: `
    <header>
      <nav class="flex justify-between p-5 bg-slate-800 text-lg font-bold ">
        <p>Juanjo Lozano</p>
        <h1 class="text-2xl text-sky-100">Trello clone</h1>
        <a
          href="https://github.com/juanjolb"
          target="_blank"
          rel="noopener noreferrer"
        >
          <app-github-icon class="w-8 h-8" />
        </a>
      </nav>
    </header>
  `,
  styles: ``,
})
export class HeaderComponent {}
