import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {


  constructor(private auth: AuthService,
              private router: Router) {}




  canActivate(route: ActivatedRouteSnapshot): boolean {
            // this will be passed from the route config
            // on the data property

            if (localStorage.getItem('role') === 'admin' || localStorage.getItem('role') === 'supA' ) {
              return true;
            } else {
              this.router.navigate(['/login']);
              return false;
            }

              }


}
