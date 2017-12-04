import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //this.router.navigate(['/home']);
    let role: string = localStorage.getItem("role"); 
    console.log(role);
    if(role === '"ADMIN"')
      return true;
    else{
      this.router.navigate(['/logowanie']);
      return false;
    }
    
  }
}
 