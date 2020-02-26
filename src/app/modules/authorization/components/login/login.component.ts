import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthorizationService } from '../../services/authorization.service';
import { User } from '../../models/user.model';
import { TasksService } from 'src/app/modules/admin/modules/tasks/services/tasks.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;

  hide = true;

  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private authorizationService: AuthorizationService, private tasksService: TasksService) { }

  ngOnInit() {
  }

  login(): void {
    this.user = {
      login: this.loginForm.controls['login'].value.trim(),
      password: this.loginForm.controls['password'].value.trim()
    }
    this.authorizationService.login(this.user);
  }
}
