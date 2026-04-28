import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'people', loadComponent: () => import('./pages/people/people').then(m => m.People) },
  { path: 'films', loadComponent: () => import('./pages/films/films').then(m => m.Films) },
  { path: 'planets', loadComponent: () => import('./pages/planets/planets').then(m => m.Planets) },
  { path: 'starships', loadComponent: () => import('./pages/starships/starships').then(m => m.Starships) },
  { path: 'vehicles', loadComponent: () => import('./pages/vehicles/vehicles').then(m => m.Vehicles) },
  { path: 'species', loadComponent: () => import('./pages/species/species').then(m => m.Species) },
  { path: '**', redirectTo: 'home' },
];
