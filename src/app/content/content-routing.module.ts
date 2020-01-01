import { BookingComponent } from './booking/booking.component';
import { ManagePromotionComponent } from './manage-promotion/manage-promotion.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { ManageToolsComponent } from './manage-tools/manage-tools.component';
import { ManageManagerComponent } from './manage-manager/manage-manager.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContentComponent } from './content.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { ManageTypecarComponent } from './manage-typecar/manage-typecar.component';
import { ManageCarserviceComponent } from './manage-carservice/manage-carservice.component';


const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'manageManager',
        component: ManageManagerComponent,
      },

      {
        path: 'manageTypecar',
        component: ManageTypecarComponent,
      },
      {
        path: 'manageCarservice',
        component: ManageCarserviceComponent,
      },

      {
        path: 'manageTools',
        component: ManageToolsComponent,
      },
      {
        path: 'manageEmployee',
        component: ManageEmployeeComponent,
      },
      {
        path: 'profile',
        children: [
          {
            path: ':id',
            component: ProfileComponent
          }
        ]

      },
      {
        path: 'managePromotion',
        component: ManagePromotionComponent
      },
      {
        path: 'manageBooking',
        component: BookingComponent
      }

    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
