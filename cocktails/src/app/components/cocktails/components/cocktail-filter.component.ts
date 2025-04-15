import {Component, model} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-cocktail-filter',
  imports: [
    FormsModule
  ],
  template: `
    <input type="text" placeholder="Rechercher un cocktail" [(ngModel)]="filter"/>
  `,
  styles: ``
})
export class CocktailFilterComponent {
  filter = model('')
}
