import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from '../services/auth.service'
import {User} from '../types/user.model'
import { last } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {
  @ViewChild('registerationForm') form;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register(){
    var traderId = this.randomInt(100000, 999999)
    var firstName = this.form.form.controls.firstName.value
    var lastName = this.form.form.controls.lastName.value
    var password = this.form.form.controls.password.value
    var balance = this.form.form.controls.balance.value
    var user = new User(traderId, firstName, lastName, balance);
    user.password = password;
    this.authService.register(user)
  }

  /**
   * generate a random integer between min and max
   * @param {Number} min 
   * @param {Number} max
   * @return {Number} random generated integer 
   */
  randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
