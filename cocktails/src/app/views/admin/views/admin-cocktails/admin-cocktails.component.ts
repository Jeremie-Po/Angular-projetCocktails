import {Component} from '@angular/core';
import {AdminNavbarComponent} from '../../component/admin-navbar.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-admin-cocktails',
  imports: [
    AdminNavbarComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <ul class="flex gap-16 mb-20">
      <a class="my-2" routerLink="list" routerLinkActive="active-link"
         [routerLinkActiveOptions]="{exact: false}">List</a>
      <a class="my-2" routerLink="new" routerLinkActive="active-link">New</a>
    </ul>
    <router-outlet/>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
    }`
})
export class AdminCocktailsComponent {

}
