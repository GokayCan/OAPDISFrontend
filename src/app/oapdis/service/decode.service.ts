import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role } from '../login/model/role';

@Injectable({
    providedIn: 'root'
})
export class DecodeService {

    jwtHelperService: JwtHelperService = new JwtHelperService();
    roles: Role[] = [];
    role: Role = new Role();

    constructor() { }

    getUserId(): number {
        let decode = this.jwtHelperService.decodeToken(localStorage.getItem("oapdisToken"));
        var userId = Object.keys(decode).filter(p => p.endsWith("/nameidentifier"))[0];
        return +decode[userId];
    }

    getTeacherId(): number {
        let decode = this.jwtHelperService.decodeToken(localStorage.getItem("oapdisToken"));
        var userId = Object.keys(decode).filter(p => p.endsWith("/actor"))[0];
        return +decode[userId];
    }

    getUserTpeId(): string {
        let decode = this.jwtHelperService.decodeToken(localStorage.getItem("oapdisToken"));
        var userTypeId = Object.keys(decode).filter(p => p.endsWith("/userdata"))[0];
        return decode[userTypeId][0];
    }

    getUserName(): string {
        let decode = this.jwtHelperService.decodeToken(localStorage.getItem("oapdisToken"));
        var userName = Object.keys(decode).filter(p => p.endsWith("/name"))[0];
        return decode[userName];
    }

    getUserRole(): string {

        let decode = this.jwtHelperService.decodeToken(localStorage.getItem("oapdisToken"));
        var userRoles = Object.keys(decode).filter(p => p.endsWith("/role"));

        userRoles.forEach(element => {
            let model: Role = new Role();
            model.role = decode[element];
            this.roles.push(model);
            this.role.role = model.role;
        });


        return this.role.role;
    }

}
