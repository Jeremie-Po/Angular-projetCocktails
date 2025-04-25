import {Component, effect, inject} from '@angular/core';
import {FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-cocktails-form',
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <h3 class="mb-20">Création d'un cocktail</h3>
    <form class="flex flex-col gap-12" [formGroup]="cocktailForm" (submit)="submit()">
      <div class="flex flex-col mb-10">
        <label for="name">Nom du cocktail</label>
        <input formControlName="name" type="text" id="name">
      </div>
      <div class="flex flex-col mb-10">
        <label for="description">Description du cocktail</label>
        <textarea formControlName="description" id="description" cols="3"></textarea>
      </div>
      <div class="flex flex-col mb-10">
        <label for="imageUrl">Image du cocktail</label>
        <input formControlName="imageUrl" type="text" id="imageUrl">
      </div>
      <div class="flex align-items-center gap-12">
        <label class="flex-auto">Ingredients</label>
        <button (click)=addIngredient() class="btn btn-primary"> Ajouter</button>
      </div>
      <ul formArrayName="ingredients">
        @for (ingredient of ingredients.controls; track $index) {
          <li class="flex align-items-center gap-12 mb-10">
            <input class="flex-auto" type="text" [formControlName]="$index">
            <button (click)="deleteIngredient($index)" class="btn btn-danger">Delete</button>
          </li>
        }
      </ul>
      <button class="btn btn-primary"> Sauvegarder</button>
    </form>
  `,
  host:
    {class: "card"}
  ,
  styles: `
    .card {
      padding: 8px;
    }`

})
export class AdminCocktailsFormComponent {
  private fb = inject(FormBuilder);

  cocktailForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    imageUrl: [''],
    ingredients: this.fb.array([]),
  })

  get ingredients() {
    return this.cocktailForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.control(''));
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  };

  submit() {
    console.log(this.cocktailForm.value);

  }

  constructor() {
    effect(() => {
      console.log(this.cocktailForm);

    })
  }
}
