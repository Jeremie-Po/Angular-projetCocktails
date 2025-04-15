import {Component} from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <h3 class="flex-auto bold text-lg">Cocktails</h3>
    <ul>
      <li class="flex flex-row gap-16">
        <a href="#">Liste des cocktails</a>
        <a href="#">Panier</a>
      </li>
    </ul>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: var(--primary);
      color: white;
      height: 56px;
      padding: 0 16px;
    }`
})
export class HeaderComponent {

}
