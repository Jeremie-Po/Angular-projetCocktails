import {Component} from '@angular/core';
import {Cocktail} from 'app/shared/interface';

@Component({
  selector: 'app-cocktail-details',
  imports: [],
  template: `
    <img class="mb-20" [src]="cocktail.imageUrl" alt="Photo d'un cocktail Mojito"/>
    <h3 class="mb-20">{{ cocktail.name }}</h3>
    <p class="mb-20">{{ cocktail.description }}</p>
    <div>
      <button class="btn btn-primary">ajouter cocktail</button>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
    }`
})
export class CocktailDetailsComponent {
  cocktail: Cocktail = {
    imageUrl: "https://www.cocktail.fr/wp-content/uploads/2017/05/cocktail.fr-44155-1-1013x675.jpg.webp",
    name: "Mojito",
    description: "saveur menthe rhum",
    ingredients: ['menthes', 'rhum', 'eau gazeuse', 'citron vert', 'sucre de canne'],
  }
}
