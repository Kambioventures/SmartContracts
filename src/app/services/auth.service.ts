import { User } from '../types/user.model'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { HyperledgerService } from './Hyperledger.service';

@Injectable()
export class AuthService {
  loggedIn = false;
  registeredUser: User;

  constructor(private router: Router, private firebaseService: FirebaseService, private hyperledgerService: HyperledgerService) { }

  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        resolve(this.loggedIn)
      }
    )
    return promise
  }

  login(user: User) {
    this.firebaseService.get_users().subscribe(
      (response) => {
        let users: User[] = response.json();
        for (let id in users) {
          if (user.firstName == users[id].firstName && user.password == users[id].password) {
            this.loggedIn = true
            this.registeredUser = users[id];
            this.router.navigate(['/home'])
            return;
          }
        }
        this.router.navigate(['/register'])
      }, (error) => {
        console.log(error)
      }
    )
  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  register(user: User) {
    if (typeof user === 'undefined')
      return
    this.firebaseService.add_user(user).subscribe(
      (response) => { console.log(response) },
      (error) => { console.log(error) }
    )
    this.hyperledgerService.addUser(user).subscribe(
      (response) => { console.log(response) },
      (error) => { console.log(error) }
    )
    this.registeredUser = user
    this.router.navigate(['/login'])
  }

  getUser() {
    return this.registeredUser;
  }

  setUser(user: User) {
    if (typeof user === 'undefined')
      return

    this.registeredUser = user
  }
}