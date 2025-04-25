import {Injectable, resource} from '@angular/core';
import {Cocktail, CocktailForm} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CocktailsService {
  BASE_URL = 'https://restapi.fr/api/acocktails';

  cocktailsResource = resource({
    loader: async (): Promise<Cocktail[]> => (await fetch(this.BASE_URL)).json(),
  })

  async deleteCocktail(id: string) {
    try {
      const response = await fetch(`${this.BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        this.cocktailsResource.update((cocktails) => {
          return cocktails?.filter(({_id}) => (_id !== id))
        });
      } else {
        throw new Error('Not deleted');
      }
    } catch {
      throw new Error('Not deleted');
    }
  }

  async addCocktail(cocktailForm: CocktailForm) {
    try {
      const response = await fetch(this.BASE_URL, {
        method: "POST",
        body: JSON.stringify(cocktailForm),
        headers: {
          'Content-type': 'application/json'
        },
      });
      const body = await response.json()
      if (response.ok) {
        // this.todosResource.update((todos) => {
        //
        //   return [...todos ?? [], body];
        // });
        this.cocktailsResource.reload();
      } else {
        throw new Error(`Le cocktail n'a pas pu etre ajouté`);
      }
    } catch (e) {
      throw new Error(`Le cocktail n'a pas pu etre ajouté`);
    }

  }

  async updateCocktail(cocktail: Cocktail) {
    try {
      const {_id, ...restCocktail} = cocktail;
      const response = await fetch(`${this.BASE_URL}/${_id}`, {
        method: "PATCH",
        body: JSON.stringify(restCocktail),
        headers: {
          'Content-type': 'application/json'
        },
      });
      const body = await response.json()
      if (response.ok) {
        this.cocktailsResource.reload();
      } else {
        throw new Error('impossible de mettre a à jours le cocktail');
      }
    } catch (e) {
      throw new Error('impossible de mettre a à jours le cocktail');
    }

  }

  constructor() {

  }
}
