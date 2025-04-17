import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  likedCocktailIds = signal<string[]>([]);

  likeCocktail(id: string) {
    this.likedCocktailIds.update((ids) => [...ids, id]);
  }

  unLikeCocktail(id: string) {
    this.likedCocktailIds.update((ids) =>
      ids.filter((c) => c !== id)
    )
  }

  isLiked(id: string) {
    return this.likedCocktailIds().includes(id)
  }
}
