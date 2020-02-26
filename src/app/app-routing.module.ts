import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/authorization/components/login/login.component';
import { SignUpComponent } from './modules/authorization/components/sign-up/sign-up.component';
import { AdminComponent } from './modules/admin/admin.component';
import { TasksComponent } from './modules/admin/modules/tasks/components/tasks/tasks.component';
import { UsersComponent } from './modules/admin/modules/users/components/users/users.component';
import { AuthorizationGuard } from './modules/authorization/guards/authorization.guard';
import { AuthGuard } from './modules/admin/guards/auth.guard';


const adminRoutes: Routes = [
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] }
]

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AuthorizationGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AuthorizationGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [AuthorizationGuard] },
  { path: 'admin', component: AdminComponent, children: adminRoutes, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
