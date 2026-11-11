
import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Produtos } from './pages/produtos/produtos';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: Dashboard,
    title: 'Visão geral | NoEstoque',
  },
  {
    path: 'produtos',
    component: Produtos,
    title: 'Produtos | NoEstoque',
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
