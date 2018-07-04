import {
 CanActivate,
 ActivatedRouteSnapshot,
 RouterStateSnapshot,
 Router
} from '@angular/router';

import {AuthService} from '../services/auth.service'
import {Injectable} from '@angular/core'; 
import {Observable} from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
    return this.authService.isAuthenticated().then(
        (authenticated: boolean) => {
          if(authenticated){
            return true;
          }else{
            this.router.navigate(['/login']);
            return false;
          }
        }
      )
  }
}