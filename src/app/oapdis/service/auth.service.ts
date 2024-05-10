import { JwtHelperService } from '@auth0/angular-jwt';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '../login/model/login';
import { Token } from '../login/model/token';
import { MessageService } from 'primeng/api';
import { DecodeService } from './decode.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})



export class AuthService {

    oapdisToken: Token = new Token();

    constructor(private httpClient: HttpClient, private router: Router, private messageService: MessageService, private jwtHelper: JwtHelperService, private route: ActivatedRoute, private decoder: DecodeService) { }

    isAuthenticate() {
        if (localStorage.getItem("oapdisToken")) {
            return true;
        }
        return false;
    }

    async login(login: Login): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            let api = environment.apiUrl + "auth/Login";
            this.httpClient.post(api, login).subscribe(
                (res: any) => {
                    this.oapdisToken = res.data;
                    this.identityCheck();
                    localStorage.setItem("oapdisToken", this.oapdisToken.accessToken);
                    setTimeout(() => {
                        let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
                        this.router.navigateByUrl(returnUrl);
                    }, 700);
                    resolve(true);
                    this.messageService.add({ severity: 'info', summary: 'Bilgi', detail: "Giriş İşlemi Başarılı" });
                },
                (error) => {
                    //this.messageService.add({ severity: 'error', summary: 'Hata', detail: error.error })
                    resolve(false);
                }
            );
        });
    }

    logout() {
        localStorage.removeItem("oapdisToken");
        setTimeout(() => {
            this.router.navigate(['/login']);
        }, 750);
        this.messageService.add({ severity: 'info', summary: 'Bilgi', detail: "Çıkış İşlemi Başarılı" });
    }

    hasRequiredRoles(requiredRoles: Array<string> | string): boolean {
        if (!this.isAuthenticated) {
            return false;
        }
        let match = requiredRoles.includes(this.decoder.getUserRole());
        return match;
    }

    identityCheck() {
        const token = localStorage.getItem("oapdisToken");
        let expired: boolean;

        try {
            expired = this.jwtHelper.isTokenExpired(token);
        }
        catch (error) {
            expired = true;
        }
        _isAuthenticated = token != null && !expired;
    }


    get isAuthenticated(): boolean {
        return _isAuthenticated;
    }


}

export let _isAuthenticated: boolean;
