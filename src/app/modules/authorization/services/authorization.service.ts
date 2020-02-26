import { Injectable } from '@angular/core';
import { User, Users } from '../models/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private users: Users = [
    { login: 'grisha', password: 'trulala123', id: '1' },
    { login: 'kventin', password: 'blabla', id: '2' }
  ]

  constructor(private router: Router, private toastrService: ToastrService){}

  get getUsers() {
    return this.users;
  }

  createNewUser(user: User) {
    const duplicate = this.users.find(element => user.login === element.login);
    if (duplicate) {
      this.toastrService.error('', 'User already exist!');
    } else {
      this.users.push(user);
      this.router.navigate(['login']);
      this.toastrService.success('', 'User created successfuly!');
    }
  }

  login(user: User) {
    const exist = this.users.find(element => user.login === element.login && user.password === element.password);
    console.log(exist);
    if (exist) {
      delete exist.password; 
      localStorage.setItem('user', JSON.stringify(exist));
      this.router.navigate(['admin/tasks']);
    } else this.toastrService.error('', 'Incorrect login or password!');
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
    this.toastrService.success('', 'Logout successfuly!');
  }
}
