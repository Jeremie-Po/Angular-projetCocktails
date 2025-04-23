import {Routes} from '@angular/router';
import {CocktailsComponent} from './components/cocktails/cocktails.component';

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
