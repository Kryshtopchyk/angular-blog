import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminLayoutComponent} from './components/admin-layout/admin-layout.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {DashboardPageComponent} from './components/dashboard-page/dashboard-page.component';
import {EditPageComponent} from './components/edit-page/edit-page.component';
import {CreatePageComponent} from './components/create-page/create-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from './services/auth.guard';
import {SearchPipe} from '../pipes/search.pipe';
import {AlertComponent} from './components/alert/alert.component';
import {AlertService} from './services/alert.service';

const routes: Routes = [{
  path: '', component: AdminLayoutComponent, children: [
    {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
    {path: 'login', component: LoginPageComponent},
    {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
    {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
    {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]}
  ]
}];

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    EditPageComponent,
    CreatePageComponent,
    SearchPipe,
    AlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard,
    AlertService
  ]
})

export class AdminModule {
}
