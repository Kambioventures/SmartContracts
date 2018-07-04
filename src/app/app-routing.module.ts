import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { DocumentComponent } from './document/document.component';
import { EmployeeComponent } from './employee/employee.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { LoginComponent } from './login/login.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { AuthenticationGuard } from './guards/AuthenticationGuard';
import { DashboardComponent } from './dashboard/dashboard.component'
import { ProfileComponent } from './profile/profile.component'

const appRoutes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterationComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard], children: [
        {path: '', component: ProfileComponent},
        {path: 'dashboard', component: DashboardComponent},
        {path: 'asset', component: DocumentComponent},
        {path: 'employee', component: EmployeeComponent},
        {path: 'moderator', component: ModeratorComponent}
    ]},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}