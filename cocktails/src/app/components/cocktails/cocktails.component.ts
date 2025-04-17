import {Component, computed, effect, inject, signal} from '@angular/core';
import {CocktailsListComponent} from './components/cocktails-list.component';
import {CocktailDetailsComponent} from './components/cocktail-details.component';
import {Cocktail} from '../../shared/interface';
import {Cocktails} from '../../shared/data'
import {normalizeExtraEntryPoints} from '@angular-devkit/build-angular/src/tools/webpack/utils/helpers';
import {CocktailsService} from '../../shared/services/cocktails.service';

@Component({
  selector: 'app-cocktails',
  imports: [
    CocktailsListComponent,
    CocktailDetailsComponent
  ],
  template: `
    <app-cocktails-list class="w-half card xs-w-full"
                        [cocktails]="cocktails()"
                        [selectedCocktailName]="selectedCocktailName()"
                        (cocktailNameSelected)="cocktailNameSelected($event)"/>
    @if (selectedCocktail()) {
      <app-cocktail-details class="w-half card xs-w-full"
                            [selectedCocktail]="selectedCocktail()"/>
    }
  `,
  styles: `
    :host {
      display: flex;
      padding: 24px;
      gap: 24px;
      @media screen and (max-width: 820px) {
        flex-direction: column;
      }
    }`
})
export class CocktailsComponent {
  cocktailsService = inject(CocktailsService);
  cocktails = computed(() => this.cocktailsService.cocktailsResource.value() || []);

  selectedCocktail = signal<Cocktail>(this.cocktails()[0]);
  selectedCocktailName = computed(() => this.selectedCocktail()?.name);

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
