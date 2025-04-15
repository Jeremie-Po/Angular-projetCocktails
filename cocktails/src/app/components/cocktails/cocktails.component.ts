import {Component, effect, signal} from '@angular/core';
import {CocktailsListComponent} from './components/cocktails-list.component';
import {CocktailDetailsComponent} from './components/cocktail-details.component';
import {Cocktail} from '../../shared/interface';
import {Cocktails} from '../../shared/data'
import {normalizeExtraEntryPoints} from '@angular-devkit/build-angular/src/tools/webpack/utils/helpers';

@Component({
  selector: 'app-cocktails',
  imports: [
    CocktailsListComponent,
    CocktailDetailsComponent
  ],
  template: `
    <app-cocktails-list class="w-half card"
                        [cocktails]="cocktails()"
                        (cocktailNameSelected)="cocktailNameSelected($event)"/>
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
  selectedCocktail = signal<Cocktail>(this.cocktails()[0])

  cocktailNameSelected(cocktailName: string) {
    const newCocktail = this.cocktails().find(({name}) =>
      name === cocktailName
    );
    if (newCocktail) {
      this.selectedCocktail.set(newCocktail);
    }
  }

  constructor() {
    effect(() => {
      console.log(this.selectedCocktail())
    })
  }
}
