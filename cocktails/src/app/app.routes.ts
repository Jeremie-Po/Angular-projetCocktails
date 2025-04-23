import {Routes} from '@angular/router';
import {CocktailsComponent} from './views/cocktails/cocktails.component';

export const routes: Routes = [
  {
    path: 'cocktails',
    component: CocktailsComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cocktails',
  },
  // {
  //   path:'**',
  //   component: NotFOundComponent,
  // }

];
