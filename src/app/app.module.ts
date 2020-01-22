import { FormatSelectItemPipe } from './shared/pipe/format-select-item-pipe.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { AccordionModule } from 'primeng/accordion';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FooterComponent } from './core/footer/footer.component';
import { TopbarComponent } from './core/topbar/topbar.component';
import { MenubarModule } from 'primeng/menubar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { MenubarComponent } from './core/menubar/menubar.component';
import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    TopbarComponent,
    MenubarComponent,
    FormatSelectItemPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ContentModule,
    AccordionModule,
    NgxSpinnerModule,
    MenubarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MenuModule,
  ],
  providers: [
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
