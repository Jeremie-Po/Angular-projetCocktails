import {Component, computed, input, model, output, signal} from '@angular/core';
import {Cocktail} from '../../../shared/interface';
import {CocktailFilterComponent} from './cocktail-filter.component';

@Component({
  selector: 'app-cocktails-list',
  imports: [
    CocktailFilterComponent
  ],
  template: `
    <h2 class="mb-20">Liste des cocktails</h2>
    <app-cocktail-filter [(filter)]="filter"/>
    <ul class="mb-20">
      @for (cocktail of filteredCocktails(); track cocktail._id) {
        @let active = cocktail._id === selectedCocktailId();
        <li class="px-12 py-6 my-2 border"
            (click)="selectedCocktailId.set(cocktail._id)"
            [class.active-item]='active'
            [class.text-primary]='active'>
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
  filter = signal<string>('');

  filteredCocktails = computed(() => {
    return this.cocktails().filter(({name}) => name.toLowerCase().includes(this.filter().toLowerCase()))
  })

  selectedCocktailId = model<string | null>(null);
}
