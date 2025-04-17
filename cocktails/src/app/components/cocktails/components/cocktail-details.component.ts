import {Component, input} from '@angular/core';
import {Cocktail} from 'app/shared/interface';

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
      <button class="btn btn-primary">ajouter cocktail</button>
      <span class="flex-auto"></span>

      @if (isLiked()) {
        <button class="btn btn-outline-primary">UnLike</button>
      } @else {
        <button class="btn btn-outline-primary">Like</button>
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
}
