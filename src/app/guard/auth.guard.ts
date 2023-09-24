import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoginServiceService } from '../services/login.service.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private loginService: LoginServiceService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.log('Guard');
        if (this.loginService.isAuthenticated()) {
            return true;
        } else {
            // Redirige al componente de login si el usuario no está autenticado
            this.router.navigateByUrl('/dashboard');
            return false;
        }
    }
}