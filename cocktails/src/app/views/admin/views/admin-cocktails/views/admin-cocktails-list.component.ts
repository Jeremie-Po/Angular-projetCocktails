import {Component, computed, inject} from '@angular/core';
import {CocktailsService} from '../../../../../shared/services/cocktails.service';

@Component({
  selector: 'app-admin-cocktails-list',
  imports: [],
  template: `
    <h3 class="mb-20">Liste des cocktails</h3>
    <ul>
      @for (cocktail of cocktails(); track cocktail._id) {
        <li class="flex gap-12 card mb-10 align-items-center">
          <span class="flex-auto">{{ cocktail.name }}</span>
          <button class="btn btn-primary">Editer</button>
          <button (click)="deleteCocktail(cocktail._id)" class="btn btn-danger">Supprimer</button>
        </li>
      } @empty {
        <p>Pas de cocktail pour le moment</p>
      }
    </ul>
  `,
  host:
    {class: "card"}
  ,
  styles: `
    .card {
      padding: 8px;
    }`
})
export class AdminCocktailsListComponent {
  cocktailsService = inject(CocktailsService);

  cocktails = computed(() => this.cocktailsService.cocktailsResource.value() || []);

  deleteCocktail(id: string) {
    this.cocktailsService.deleteCocktail(id);
  }
}
