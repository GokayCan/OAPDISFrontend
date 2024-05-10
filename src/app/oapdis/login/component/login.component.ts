import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Login } from '../model/login';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [

    ]
})
export class LoginComponent implements OnInit {


    data: Login = new Login();
    loading: boolean = false;

    constructor(private loginService: AuthService, public layoutService: LayoutService, private router: Router) { }

    ngOnInit(): void {
        if (this.loginService.isAuthenticate()) {
            this.router.navigate(["/home"]);
        }
    }

    async login() {
        await this.loginService.login(this.data).then((res) => {
            this.loading = res;
        });
    }

}
