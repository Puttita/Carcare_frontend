import { BookingFormComponent } from './booking-form/booking-form.component';
import { EditDataEmployeeComponent } from './edit-data-employee/edit-data-employee.component';
import { EditFormComponent } from './edit-form/edit-form.component';
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
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { WithdrawReturnComponent } from './withdraw-return/withdraw-return.component';
import { ManageWithdrawReturnComponent } from './manage-withdraw-return/manage-withdraw-return.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ManageChannelComponent } from './manage-channel/manage-channel.component';


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
      },

      {
        path: 'car',
        component: ManageTypecarComponent,
      },
      {
        path: 'manageCarservice',
        component: ManageCarserviceComponent,
      },

      {
        path: 'manageTool',
        component: ManageToolsComponent,
      },
      {
        path: 'manageEmployee',
        children: [
          {
            path: '',
            component: ManageEmployeeComponent,
          },
          {
            path: 'create',
            component: EditFormComponent,
            data: {
              urlback: '/manageEmployee',
              messageback: 'กลับสู่หน้าจัดการพนักงาน'
            }
          },
          {
            path: 'edit/:id',
            component: EditDataEmployeeComponent,
            data: {
              urlback: '/manageEmployee',
              messageback: 'กลับสู่หน้าจัดการพนักงาน'
            }
          },
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
        children: [
          {
            path: '',
            component: BookingComponent
          },
          {
            path: 'create',
            component: BookingFormComponent,
            data: {
              urlback: '/manageBooking',
            }
          },
          {
            path: 'detail/:id',
            component: BookingDetailComponent,
          }
        ]
      },
      {
        path: 'withdraw',
        component: WithdrawReturnComponent,
      },
      {
        path: 'manageWithdraw',
        component: ManageWithdrawReturnComponent,
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
      },
      {
        path: 'manageChannel',
        component: ManageChannelComponent
      }

    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
