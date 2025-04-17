import {Component, computed, effect, inject, signal} from '@angular/core';
import {CocktailsListComponent} from './components/cocktails-list.component';
import {CocktailDetailsComponent} from './components/cocktail-details.component';
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
                        [(selectedCocktailId)]="selectedCocktailId"/>
    @let sc = selectedCocktail();
    @if (sc) {
      <app-cocktail-details class="w-half card xs-w-full"
                            [selectedCocktail]="sc"/>
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

  selectedCocktailId = signal<string | null>(null);

  selectedCocktail = computed(() => {
    return this.cocktails().find(({_id}) => _id === this.selectedCocktailId())
  })

  constructor() {
    effect(() => {
      console.log(this.selectedCocktail())
    })
  }
}
