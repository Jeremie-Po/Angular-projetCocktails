import {Component, signal} from '@angular/core';
import {CocktailsListComponent} from './components/cocktails-list.component';
import {CocktailDetailsComponent} from './components/cocktail-details.component';
import {Cocktail} from '../../shared/interface';
import {Cocktails} from '../../shared/data'

@Component({
  selector: 'app-cocktails',
  imports: [
    CocktailsListComponent,
    CocktailDetailsComponent
  ],
  template: `
    <app-cocktails-list class="w-half card" [cocktails]="cocktails()"/>
    <app-cocktail-details class="w-half card"/>
  `,
  styles: `
    :host {
      display: flex;
      padding: 24px;
      gap: 24px;
    }`
})
export class CocktailsComponent {
  cocktails = signal<Cocktail[]>(Cocktails);
}
