import { ManageManagerComponent } from './manage-manager/manage-manager.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContentComponent } from './content.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'manageManager',
        component: ManageManagerComponent,
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
