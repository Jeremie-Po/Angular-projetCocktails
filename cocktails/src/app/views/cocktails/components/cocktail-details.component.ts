import {Component, input, output} from '@angular/core';
import {Cocktail} from 'app/shared/interfaces';

@Component({
  selector: 'app-cocktail-details',
  imports: [],
  template: `
    @let c = selectedCocktail();
    <img class="mb-20" [src]="c.imageUrl"/>
    <h3 class="mb-20">{{ c.name }}</h3>
    <p class="mb-20">{{ c.description }}</p>
    <ul class="mb-20">
      @for (ingredient of c.ingredients; track $index) {
        <li class="my-2">
          {{ ingredient }}
        </li>
      }
    </ul>
    <div class="flex">
      <button (click)='addIngredients.emit(c.ingredients)' class="btn btn-primary">ajouter le cocktail au panier
      </button>

      <span class="flex-auto"></span>

      @if (isLiked()) {
        <button (click)="unLikeCocktail.emit(c._id)" class="btn btn-primary">UnLike</button>
      } @else {
        <button (click)="likeCocktail.emit(c._id)" class=" btn btn-outline-primary">Like</button>
      }
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
    }

    ul {
      list-style: disc;
      padding-left: 20px;
      font-size: 14px;
      font-weight: 500;
    }

    img {
      max-height: 300px;
    }
  `
})
export class CocktailDetailsComponent {
  selectedCocktail = input.required<Cocktail>();
  isLiked = input.required<boolean>();

  likeCocktail = output<string>();
  unLikeCocktail = output<string>();
  addIngredients = output<string[]>();
}
