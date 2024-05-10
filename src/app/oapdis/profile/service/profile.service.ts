import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../model/profile';
import { UserChangePassword } from '../model/userChangePassword';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private httpClient: HttpClient) { }

    getProfile(id: number): Observable<Profile> {
        return this.httpClient.get<Profile>(environment.apiUrl + "Users/GetById/" + id);
    }

    updatePersonalInformation(profile: Profile): Observable<Profile> {
        return this.httpClient.post<Profile>(environment.apiUrl + "Users/UpdatePersonalInformation", profile);
    }

    updatePassword(profile: UserChangePassword): Observable<UserChangePassword> {
        return this.httpClient.post<UserChangePassword>(environment.apiUrl + "Users/UpdatePassword", profile);
    }

    updateProfilePhoto(profile: any): Observable<any> {
        return this.httpClient.post<any>(environment.apiUrl + "Users/UpdateProfilePhoto", profile);
    }
}
