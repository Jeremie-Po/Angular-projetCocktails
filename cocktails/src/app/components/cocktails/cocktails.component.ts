import {Component, computed, effect, inject, signal} from '@angular/core';
import {CocktailsListComponent} from './components/cocktails-list.component';
import {CocktailDetailsComponent} from './components/cocktail-details.component';
import {CocktailsService} from '../../shared/services/cocktails.service';
import {CartService} from '../../shared/services/cart.service';

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
                            [selectedCocktail]="sc"
                            [isLiked]="isLiked()"
      />
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
  cartService = inject(CartService);

  cocktails = computed(() => this.cocktailsService.cocktailsResource.value() || []);

  selectedCocktailId = signal<string | null>(null);
  selectedCocktail = computed(() => {
    return this.cocktails().find(({_id}) => _id === this.selectedCocktailId())
  })

  isLiked = computed(() => {
      const selectedId = this.selectedCocktailId();
      return selectedId ? this.cartService.isLiked(selectedId) : false;
    }
  )

  constructor() {
    effect(() => {
      console.log(this.selectedCocktail());
      console.log('IS LIKED', this.isLiked());
    })
  }
}
