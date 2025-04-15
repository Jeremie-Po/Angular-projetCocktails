import {Component, computed, input, output, signal} from '@angular/core';
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
      @for (cocktail of filteredCocktails(); track cocktail.name) {
        @let active = cocktail.name === selectedCocktailName();
        <li class="px-12 py-6 my-2 border"
            (click)="cocktailNameSelected.emit(cocktail.name)"
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
  selectedCocktailName = input.required();
  filter = signal<string>('');

  filteredCocktails = computed(() => {
    return this.cocktails().filter(({name}) => name.toLowerCase().includes(this.filter().toLowerCase()))
    // return this.cocktails().filter((c) => c.name.toLowerCase().includes(this.filter().toLowerCase()))
  })
  cocktailNameSelected = output<string>();
}
