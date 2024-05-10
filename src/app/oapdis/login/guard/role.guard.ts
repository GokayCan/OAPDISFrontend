import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { MessageService } from 'primeng/api';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router, private messageService: MessageService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const requiredRoles = next.firstChild?.data["roles"] || next.data["roles"] as Array<string>;

        if (this.authService.hasRequiredRoles(requiredRoles)) {
            return true;
        } else {
            // Kullanıcının giriş yapmış, ancak gerekli rol(ler)e sahip değilse, yönlendirme yapabilirsiniz.
            this.router.navigate(['/home']);
            return false;
        }
    }
}
