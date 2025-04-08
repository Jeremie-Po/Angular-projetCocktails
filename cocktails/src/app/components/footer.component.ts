import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <p class="text-sm semi-bold">© Dyma</p>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background-color: var(--gray-700);
      color: white;
    }`
})
export class FooterComponent {

}
