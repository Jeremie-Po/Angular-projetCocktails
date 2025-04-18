import {Component, ElementRef, model, viewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-cocktail-filter',
  imports: [
    FormsModule
  ],
  template: `
    <input #input class="input mb-20 w-full" type="text" placeholder="Rechercher un cocktail" [(ngModel)]="filter"/>
  `,
  styles: ``
})
export class CocktailFilterComponent {
  filter = model('');

  inputRef = viewChild<ElementRef<HTMLInputElement>>('input');

  focus() {
    this.inputRef()?.nativeElement.focus();
  }
}
