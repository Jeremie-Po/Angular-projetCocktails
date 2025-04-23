import {Component} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer.component';
import {CocktailsComponent} from './components/cocktails/cocktails.component';
import {seedData} from './shared/data/seed';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    FooterComponent,
    CocktailsComponent,
    RouterOutlet,
  ],
  template: `
    <app-header/>
    <!--    <app-cocktails class="flex-auto"/>-->
    <div class="flex flex-auto flex-col">
      <router-outlet/>
    </div>
    <app-footer/>
  `,
  styles: `
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
  `
})
export class AppComponent {
  constructor() {
    // seedData();
  }
}
