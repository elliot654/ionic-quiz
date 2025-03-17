import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'item-list',
    loadComponent: () => import('./item-list/item-list.page').then( m => m.ItemListPage)
  },
  {
    path: 'main',
    component:MainComponent
  },
 
  
];
