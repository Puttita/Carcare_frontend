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
@NgModule({
  declarations: [
    ContentComponent,
    HomeComponent,
    ManageManagerComponent,
    ManageEmployeeComponent,
    ManageTypecarComponent,
    ManageCarserviceComponent,
    ManagePromotionComponent,
    ManageToolsComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    NgxSpinnerModule,
    TableModule
  ],
  exports: [
    ContentComponent
  ]
})
export class ContentModule { }
