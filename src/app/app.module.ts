import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginForm } from './login/loginForm.component';
import { AppComponent } from './app.component';
import { Login } from './reservation/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { AuthGuard } from './auth-guard/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { UserHistoryComponent } from './user-history/user-history.component';
import { NavUserComponent } from './nav-user/nav-user.component';
import { AuthUserGuard } from './auth-guard/auth-user.guard';
import { NavAdminComponent } from './nav-admin/nav-admin.component';
import { EditDataComponent } from './edit-data/edit-data.component';
import { AllDataComponent } from './add-data/all-data.component';
import { MatTableModule } from '@angular/material/table';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DataTablesModule } from 'angular-datatables';
import { AdminHistoryComponent } from './admin-history/admin-history.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { GrowlModule } from 'primeng/primeng';
import { PasswordModule } from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginForm
  },
  {
    path: 'nav',
    component: NavUserComponent,
    children: [
      {
        path: 'reservation',
        canActivate: [AuthUserGuard],
        component: Login
      },
      {
        path: 'userHistory',
        canActivate: [AuthUserGuard],
        component: UserHistoryComponent
      },
    ]
  },
  {
    path: 'panel',
    component: NavAdminComponent,
    children: [
      {
        path: 'edit',
        canActivate: [AuthGuard],
        component: EditDataComponent
      },
      {
        path: 'show',
        canActivate: [AuthGuard],
        component: AllDataComponent
      },
      {
        path: 'history',
        canActivate: [AuthGuard],
        component: AdminHistoryComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },

]

@NgModule({
  declarations: [
    AppComponent,
    Login,
    LoginForm,
    UserHistoryComponent,
    NavUserComponent,
    NavAdminComponent,
    EditDataComponent,
    AllDataComponent,
    AdminHistoryComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    RecaptchaModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatRadioModule,
    MatTableModule,
    Ng2SmartTableModule,
    DataTablesModule,
    GrowlModule,
    PasswordModule,
    CalendarModule

  ],
  providers: [AuthGuard, AuthUserGuard], // tutaj bylo pusto
  bootstrap: [AppComponent] // CrudPerson 
})
export class AppModule { }
