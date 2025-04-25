import {Component, effect, inject, input} from '@angular/core';
import {FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {CocktailsService} from '../../../../../shared/services/cocktails.service';
import {CocktailForm} from '../../../../../shared/interfaces';

@Component({
  selector: 'app-admin-cocktails-form',
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <h3 class="mb-20">Création d'un cocktail</h3>
    <form [formGroup]="cocktailForm" (submit)="submit()">
      <div class="flex flex-col gap-12 mb-10">
        <label for="name">Nom du cocktail</label>
        <input formControlName="name" type="text" id="name">
        @if (nameControl.errors?.['required'] && nameControl.touched) {
          <p class="error">Le cocktail doit avoir un nom</p>
        }
      </div>
      <div class="flex flex-col gap-12 mb-10">
        <label for="description">Description du cocktail</label>
        <textarea formControlName="description" id="description" cols="3"></textarea>
        @if (descriptionControl.errors?.['required'] && descriptionControl.touched) {
          <p class="error">Le cocktail doit avoir une description</p>
        }
      </div>
      <div class="flex flex-col gap-12 mb-10">
        <label for="imageUrl">Image du cocktail</label>
        <input formControlName="imageUrl" type="text" id="imageUrl">
      </div>
      <div class="flex align-items-center gap-12 mb-10">
        <label class="flex-auto">Ingredients</label>
        <button (click)=addIngredient() type="button" class="btn btn-primary"> Ajouter</button>
      </div>
      <ul formArrayName="ingredients">
        @for (ingredient of ingredientsControl.controls; track $index) {
          <li class="flex align-items-center gap-12 mb-10">
            <input class="flex-auto" type="text" [formControlName]="$index">
            <button (click)="deleteIngredient($index)" class="btn btn-danger">Delete</button>
          </li>
        }
      </ul>
      <div>
        <button [disabled]="cocktailForm.invalid" class="btn btn-primary"> Sauvegarder</button>
      </div>
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

  private cocktailsService = inject(CocktailsService);

  cocktailForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    imageUrl: [''],
    ingredients: this.fb.array([]),
  })

  get ingredientsControl() {
    return this.cocktailForm.get('ingredients') as FormArray;
  }

  get nameControl() {
    return this.cocktailForm.get('name') as FormControl;
  }

  get descriptionControl() {
    return this.cocktailForm.get('description') as FormControl;
  }

  addIngredient() {
    this.ingredientsControl.push(this.fb.control(''));
  }

  deleteIngredient(index: number) {
    this.ingredientsControl.removeAt(index);
  };

  submit() {
    console.log(this.cocktailForm.value);
    this.cocktailsService.addCocktail(this.cocktailForm.getRawValue() as CocktailForm)
  }
}
