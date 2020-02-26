import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';
import { SharedModule } from './modules/shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    SharedModule,
    TasksModule,
    UsersModule,
    AppRoutingModule
  ]
})
export class AdminModule { }
