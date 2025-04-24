import {Routes} from '@angular/router';
import {AdminCocktailsFormComponent} from './views/admin-cocktails-form.component';
import {AdminCocktailsListComponent} from './views/admin-cocktails-list.component';
import {AdminCocktailsComponent} from './admin-cocktails.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminCocktailsComponent,
    children: [
      {
        path: "list",
        component: AdminCocktailsListComponent,
      },
      {
        path: "new",
        component: AdminCocktailsFormComponent,
      },
      {
        path: ":cocktailId/edit",
        component: AdminCocktailsFormComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ]

  },
];
