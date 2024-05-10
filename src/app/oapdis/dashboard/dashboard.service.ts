import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Dashboard } from './dashboard';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private httpClient: HttpClient, private router: Router) { }

    //write GetDashboardData method
    getDashboardData(): Observable<any> {
        return this.httpClient.get<any>(environment.apiUrl + "Dashboards/GetDashboardData");
    }

    getDailyMeetingCount(): Observable<any> {
        return this.httpClient.get<any>(environment.apiUrl + "Meetings/GetDailyCount");
    }

}
