import {Injectable, resource} from '@angular/core';
import {Cocktail} from '../interfaces';

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

  constructor() {

  }
}
