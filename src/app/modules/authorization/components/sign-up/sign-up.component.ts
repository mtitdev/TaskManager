import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthorizationService } from '../../services/authorization.service';
import { User } from '../../models/user.model';
import { TasksService } from 'src/app/modules/admin/modules/tasks/services/tasks.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: User;

  hide = true;
  signupForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  
  constructor(private authorizationService: AuthorizationService, private tasksService: TasksService) { }

  ngOnInit() {
  }

  createUser(): void {
    if (this.signupForm.controls['login'].value !== '' && this.signupForm.controls['password'].value !== '') {
      this.user = {
        login: this.signupForm.controls['login'].value.trim(),
        password: this.signupForm.controls['password'].value.trim(),
        id: `f${(+new Date()).toString(16)}`
      }
      this.authorizationService.createNewUser(this.user);
      this.tasksService.createNewTasks(this.user.id);
    }
    console.log(this.authorizationService.getUsers);
    console.log(this.tasksService.allTasks);
  }
}
