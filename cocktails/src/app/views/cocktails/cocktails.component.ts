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
                        [(selectedCocktailId)]="selectedCocktailId"
                        [isLiked]="isLiked()"
                        (likeCocktail)="likeCocktail($event)"
                        (unLikeCocktail)="unLikeCocktail($event)"
                        [cocktailsLikedList]="cocktailsLikedList()"
    />

    @let sc = selectedCocktail();
    @if (sc) {
      <app-cocktail-details class="w-half card xs-w-full"
                            [selectedCocktail]="sc"
                            [isLiked]="isLiked()"
                            (likeCocktail)="likeCocktail($event)"
                            (unLikeCocktail)="unLikeCocktail($event)"
      />
    }
  `,
  styles: `
    :host {
      flex: 1 1 auto;
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
  );

  cocktailsLikedList = computed(() => {
      return this.cartService.likedCocktailIds();
    }
  )

  likeCocktail(id: string) {
    this.cartService.likeCocktail(id);
  };

  unLikeCocktail(id: string) {
    this.cartService.unLikeCocktail(id);
  }

  constructor() {
    // effect(() => {
    //   console.log(this.selectedCocktail());
    //   console.log('IS LIKED', this.isLiked());
    //   console.log('likeIds', this.cartService.likedCocktailIds())
    // })
  }
}
