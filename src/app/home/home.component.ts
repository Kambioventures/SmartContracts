import { Component, OnInit } from '@angular/core';
import { HyperledgerService } from '../services/Hyperledger.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authenticated : boolean =false;

  constructor(private hyperLedgerService: HyperledgerService, private authService: AuthService) {}

  ngOnInit() {}

  isAuthenticated(){
    this.authenticated = this.hyperLedgerService.verified
    return true;
  }

  logout(){
    this.authService.logout();
  }
}
