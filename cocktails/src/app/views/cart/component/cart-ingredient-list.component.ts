import {Component, computed, inject, input} from '@angular/core';
import {CartService} from '../../../shared/services/cart.service';

@Component({
  selector: 'app-cart-ingredient-list',
  imports: [],
  template: `
    <h2 class="mb-20">Liste des ingrédients</h2>
    <ul>
      @for (ingredient of ingredients(); track $index) {
        <li>{{ ingredient }}</li>
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
  ingredients = input<string[]>();

}
