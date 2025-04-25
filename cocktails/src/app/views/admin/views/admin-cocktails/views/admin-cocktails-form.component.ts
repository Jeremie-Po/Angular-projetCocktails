import {Component, inject} from '@angular/core';
import {FormArray, FormBuilder, FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-admin-cocktails-form',
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <h3>Création d'un cocktail</h3>
    <form class="w-half" [formGroup]="cocktailForm" (submit)="submit()">
      <div class="flex flex-col mb-10">
        <label for="name">Nom du cocktail</label>
        <input formControlName="name" type="text" id="name">
      </div>
      <div class="flex flex-col mb-10">
        <label for="description">Description du cocktail</label>
        <input formControlName="description" type="text" id="description">
      </div>
      <div class="flex flex-col mb-10">
        <label for="imageUrl">Image du cocktail</label>
        <input formControlName="imageUrl" type="text" id="imageUrl">
      </div>
      <div formArrayName="ingredients" class="flex flex-col mb-20">
        <label>Ingredients</label>
        <button (click)=addIngredient() class="mb-10 btn btn-primary"> Ajouter un ingrédient</button>
        @for (ingredient of ingredients.controls; track $index) {
          <div class=" flex gap-16 mb-10">
            <input class="flex-auto " type="text" [formControlName]="$index">
            <!--            <button (click)="deleteHobby($index)" class="btn btn-danger">Delete</button>-->
          </div>
        }
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
  fb = inject(FormBuilder);
  cocktailForm = this.fb.group({
    name: [''],
    description: [''],
    imageUrl: [''],
    ingredients: this.fb.array([]),
  })

  get ingredients() {
    return this.cocktailForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }

  submit() {
    console.log(this.cocktailForm.value);
  }
}
