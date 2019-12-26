import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContentComponent } from './content.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
