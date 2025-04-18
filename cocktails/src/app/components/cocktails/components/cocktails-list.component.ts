import {Component, computed, ElementRef, input, model, output, signal, viewChild} from '@angular/core';
import {Cocktail} from '../../../shared/interfaces';
import {CocktailFilterComponent} from './cocktail-filter.component';

@Component({
  selector: 'app-cocktails-list',
  imports: [
    CocktailFilterComponent
  ],
  template: `
    <h2 class="mb-20">Liste des cocktails</h2>
    <app-cocktail-filter #search [(filter)]="filter"/>
    <ul class="mb-20">
      @let likedList = cocktailsLikedList();
      @for (cocktail of filteredCocktails(); track cocktail._id) {
        @let active = cocktail._id === selectedCocktailId();
        <li class="px-12 py-6 my-2 border"
            (click)="selectedCocktailId.set(cocktail._id)"
            [class.active-item]='active'
            [class.text-primary]='active'>
          <h3 class="flex">
            <span class="flex-auto">{{ cocktail.name }}</span>
            @if (likedList.includes(cocktail._id)) {
              <span>&#9829;</span>
            }
          </h3>
        </li>
      }
    </ul>
    <button class="btn btn-primary">Ajouter un cocktail</button>
  `,
  styles: `li:hover {
    cursor: pointer;
    background-color: var(--light);
  }`,
  host: {
    '(window:keydown)': `keyboardInteraction($event)`, //editor/inspection unresolved javascript reference est passé à warning plutot qu'a error
  },
})
export class CocktailsListComponent {
  cocktailsLikedList = input<string[]>([]);
  search = viewChild<CocktailFilterComponent>('search');

  cocktails = input<Cocktail[]>([]);
  filter = signal<string>('');

  filteredCocktails = computed(() => {
    return this.cocktails().filter(({name}) => name.toLowerCase().includes(this.filter().toLowerCase()))
  })

  selectedCocktailId = model<string | null>(null);

  likeCocktail = output<string>();
  unLikeCocktail = output<string>()
  isLiked = input.required<boolean>();

  keyboardInteraction({key}: KeyboardEvent) {
    switch (key) {
      case 'Escape' : {
        this.selectedCocktailId.set(null);
        break;
      }
      case 'Enter' : {
        const selectedCocktailId = this.selectedCocktailId();
        if (selectedCocktailId) {
          if (this.isLiked()) {
            this.unLikeCocktail.emit(selectedCocktailId);
          } else {
            this.likeCocktail.emit(selectedCocktailId);
          }
        }
        break;
      }
      case 'ArrowDown' :
      case 'ArrowUp' : {
        const selectedCocktailId = this.selectedCocktailId();
        const cocktails = this.cocktails();

        if (cocktails) {
          if (selectedCocktailId) {
            const index = cocktails.findIndex(
              ({_id}) => _id === selectedCocktailId
            );
            if (key === 'ArrowDown') {
              const cocktailIndex = index === cocktails.length - 1 ? 0 : index + 1;
              this.selectedCocktailId.set(cocktails[cocktailIndex]._id);
            } else {
              const cocktailIndex = index === 0 ? cocktails.length - 1 : index - 1;
              this.selectedCocktailId.set(cocktails[cocktailIndex]._id);
            }
          } else {
            if (key === 'ArrowDown') {
              const {_id} = cocktails[0];
              this.selectedCocktailId.set(_id);
            } else {
              const {_id} = cocktails.at(-1)!;
              this.selectedCocktailId.set(_id);
            }
          }
        }
        break;
      }
      default: {
        this.search()?.focus();
      }
    }
  }

//explication du focus lors d'un kaydown sur la bar de recherche dans le composant enfant filter
//
// ✅ #input dans l’enfant : tu crées une référence locale sur l’élément <input> du template enfant → #input
//
// ✅ viewChild('input') dans le TS enfant : tu accèdes au vrai DOM via ElementRef, ce qui te permet de manipuler le champ (comme faire focus() dessus)
//
// ✅ Méthode .focus() dans l’enfant : encapsule la logique this.inputRef()?.nativeElement.focus() pour la rendre accessible de l’extérieur
//
// ✅ #search dans le parent : référence le composant enfant lui-même (pas le input, mais le composant CocktailFilterComponent)
//
// ✅ viewChild('search') dans le TS parent : accède à l’instance du composant enfant, donc à sa méthode .focus()
//
// ✅ Méthode keyboardInteraction() dans le parent : quand une touche est pressée, tu rediriges l’attention vers le champ de recherche via this.search()?.focus()


}
