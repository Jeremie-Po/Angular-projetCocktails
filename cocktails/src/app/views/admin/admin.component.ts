import {Component} from '@angular/core';
import {AdminNavbarComponent} from './component/admin-navbar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [
    AdminNavbarComponent,
    RouterOutlet
  ],
  template: `
    <app-admin-navbar/>
    <div class="flex-auto">
      <router-outlet/>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      gap: 24px;
      padding: 14px;
      flex: 1 1 auto;
    }`
})
export class AdminComponent {

}
