import {Component} from '@angular/core';
import {CartIngredientListComponent} from './component/cart-ingredient-list.component';

@Component({
  selector: 'app-cart',
  imports: [
    CartIngredientListComponent
  ],
  template: `
    <app-cart-ingredient-list class="card"/>
  `,
  styles: `
    :host {
      flex: 1 1 auto;
      padding: 24px;
    }`
})
export class CartComponent {

}
