import {Component, computed, effect, inject, input} from '@angular/core';
import {CartService} from '../../../shared/services/cart.service';

@Component({
  selector: 'app-cart-ingredient-list',
  imports: [],
  template: `
    <h2 class="mb-20">Liste des ingrédients</h2>
    <ul>
      @for (ingredient of ingredientsDisplay(); track $index) {
        <li>{{ ingredient[0] }} : <strong>{{ ingredient[1] }}</strong></li>
      } @empty {
        <p>Aucun ingrédient n'a été ajouté</p>
      }
    </ul>
  `,
  styles: `:host {
    display: block;
  }`
})
export class CartIngredientListComponent {
  ingredients = input<string[]>([]);
  ingredientsDisplay = computed(() => {
    return Object.entries(this.ingredients().reduce((acc, i) => {
      if (acc[i]) {
        acc[i]++;
      } else {
        acc[i] = 1;
      }
      return acc
    }, {} as { [s: string]: number }));
  })

  constructor() {

    effect(() => {
      console.log(this.ingredientsDisplay());
    })
  }
}
