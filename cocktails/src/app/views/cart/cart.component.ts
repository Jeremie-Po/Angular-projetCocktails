import {Component, computed, inject, Signal} from '@angular/core';
import {CartIngredientListComponent} from './component/cart-ingredient-list.component';
import {CartService} from '../../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [
    CartIngredientListComponent
  ],
  template: `
    <app-cart-ingredient-list class="card" [ingredients]="ingredients()"/>
  `,
  styles: `
    :host {
      flex: 1 1 auto;
      padding: 24px;
    }`
})
export class CartComponent {
  private cartService = inject(CartService);

  ingredients: Signal<string[]> = computed(() => {
    return this.cartService.ingredients();
  })
}
