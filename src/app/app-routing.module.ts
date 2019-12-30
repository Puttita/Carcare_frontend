import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import(`./content/content.module`).then(content => content.ContentModule) },
  { path: 'auth', loadChildren: () => import(`./auth/auth.module`).then(auth => auth.AuthModule) },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
