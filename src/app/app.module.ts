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


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    TopbarComponent
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
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
