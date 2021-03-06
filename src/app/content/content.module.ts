import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { ContentRoutingModule } from './content-routing.module';
import { HomeComponent } from './home/home.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ManageManagerComponent } from './manage-manager/manage-manager.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { ManageTypecarComponent } from './manage-typecar/manage-typecar.component';
import { ManageCarserviceComponent } from './manage-carservice/manage-carservice.component';
import { ManagePromotionComponent } from './manage-promotion/manage-promotion.component';
import { ManageToolsComponent } from './manage-tools/manage-tools.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BookingComponent } from './booking/booking.component';
import { ProfileComponent } from './profile/profile.component';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { AuthService } from '../shared/services/auth.service';
import { AuthGuard } from '../shared/guard/auth.guard';
import { HttpClientService } from '../shared/services/http-client.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { EditFormComponent } from './edit-form/edit-form.component';
import { ConfirmationService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { EditDataEmployeeComponent } from './edit-data-employee/edit-data-employee.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { WithdrawReturnComponent } from './withdraw-return/withdraw-return.component';
import { ManageWithdrawReturnComponent } from './manage-withdraw-return/manage-withdraw-return.component';
import { OrderListModule } from 'primeng/orderlist';
import { ListboxModule } from 'primeng/listbox';
import { ManageChannelComponent } from './manage-channel/manage-channel.component';
import { TooltipModule } from 'primeng/tooltip';
import { KeyFilterModule } from 'primeng/keyfilter';

@NgModule({
  declarations: [
    ContentComponent,
    HomeComponent,
    ManageManagerComponent,
    ManageEmployeeComponent,
    ManageTypecarComponent,
    ManageCarserviceComponent,
    ManagePromotionComponent,
    ManageToolsComponent,
    BookingComponent,
    ProfileComponent,
    BookingDetailComponent,
    ScheduleComponent,
    EditFormComponent,
    EditDataEmployeeComponent,
    BookingFormComponent,
    WithdrawReturnComponent,
    ManageWithdrawReturnComponent,
    ManageChannelComponent,

  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    NgxSpinnerModule,
    TableModule,
    ButtonModule,
    CardModule,
    CalendarModule,
    InputTextModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputMaskModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    ToastModule,
    AutoCompleteModule,
    CheckboxModule,
    MultiSelectModule,
    OrderListModule,
    ListboxModule,
    TooltipModule,
    KeyFilterModule,
    ToastModule
  ],
  providers: [AuthService, AuthGuard, HttpClientService, ConfirmationService],
})
export class ContentModule { }
