import {Component, input} from '@angular/core';
import {Cocktail} from '../../../shared/interface';

@Component({
  selector: 'app-cocktails-list',
  imports: [],
  template: `
    <h2 class="mb-20">Liste des cocktails</h2>
    <ul class="mb-20">
      @for (cocktail of cocktails(); track cocktail.name) {
        <li class="px-12 py-6 my-2 border">
          <h3>{{ cocktail.name }}</h3>
        </li>
      }
    </ul>
    <button class="btn btn-primary">Ajouter un cocktail</button>
  `,
  styles: `li:hover {
    cursor: pointer;
    background-color: var(--light);
  }`
})
export class CocktailsListComponent {
  cocktails = input<Cocktail[]>([])
}
