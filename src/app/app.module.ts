import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {LoginComponent} from './login/login.component';
import {RegisterationComponent} from './registeration/registeration.component';
import {AppRoutingModule} from './app-routing.module'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { DocumentComponent } from './document/document.component';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import {AuthService} from './services/auth.service'
import {AuthenticationGuard} from './guards/AuthenticationGuard';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeComponent,
    ModeratorComponent,
    DocumentComponent,
    LoginComponent,
    RegisterationComponent,
    FileUploadComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    AuthService,
    AuthenticationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
