import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { MessageService } from 'primeng/api';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private authService: AuthService, private router: Router, private jwtHelper: JwtHelperService, private messageService: MessageService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this.authService.identityCheck();

        if (this.authService.isAuthenticated) {
            return true;
        }
        else {
            this.messageService.add({ severity: 'error', summary: 'Yetkisiz Erişim', detail: "Oturum Açmanız Gerekiyor" });
            setTimeout(() => {
                this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
            }, 1000);
            return false;
        }
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this.authService.identityCheck();
        if (this.authService.isAuthenticated) {
            return true;
        }
        else {
            this.messageService.add({ severity: 'error', summary: 'Yetkisiz Erişim', detail: "Oturum Açmanız Gerekiyor" });
            setTimeout(() => {
                this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
            }, 1000);
            return false;
        }
    }

}
