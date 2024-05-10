import { Injectable } from "@angular/core";
import * as signalR from '@microsoft/signalr';
import { Dashboard } from "../dashboard/dashboard";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { MeetingDailyCount } from "../dashboard/meetingDailyCount";

@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    public hubConnection: signalR.HubConnection;
    dashboardData: Dashboard;
    dashboardDataSubject = new BehaviorSubject<any>(null);
    calendarData: MeetingDailyCount;
    calendarDataSubject: Subject<MeetingDailyCount> = new Subject<MeetingDailyCount>();

    constructor(private httpClient: HttpClient) {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(environment.signalRUrl)
            .withAutomaticReconnect([1000, 1000, 2000, 2000, 10000])
            .build();
    }

    public getState(): number {
        const stateString = this.hubConnection.state;
        // Dönüşüm yapmadan önce durumu uygun bir biçime getirin
        switch (stateString) {
            case "Connecting":
                return ConnectionState.Connecting;
            case "Connected":
                return ConnectionState.Connected;
            case "Disconnected":
                return ConnectionState.Disconnected;
            case "Reconnecting":
                return ConnectionState.Reconnecting;
            default:
                return ConnectionState.Unknown;
        }
    }


    public startConnection(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.hubConnection.start()
                .then(() => {
                    console.log(`SignalR bağlantısı başarılı bir şekilde kuruldu.`);
                    resolve();
                })
                .catch((error) => {
                    setTimeout(() => {
                        this.startConnection()
                            .then(() => resolve())
                            .catch((error) => reject(error));
                    }, 5000);
                });
        });
    }

    public async addDashboardDataListener(): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            this.hubConnection.on('ReceiveDashboardData', (data: any) => {
                if (data) {
                    this.dashboardData = data;
                    this.dashboardDataSubject.next(data);
                    resolve();
                } else {
                    reject();
                }
            });
        });
    }

    public async addCalendarDataListener(): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            this.hubConnection.on('ReceiveCalendarData', (data: any) => {
                if (data) {
                    this.calendarData = data;
                    this.calendarDataSubject.next(data);
                    resolve();
                } else {
                    reject();
                }
            });
        });
    }

    public async invoke(): Promise<void> {
        await this.hubConnection.invoke('SendDashboardData');
    }

    public async invokeCalendar(date: Date): Promise<void> {
        await this.hubConnection.invoke('SendCalendarData', date);
    }
}

export enum ConnectionState {
    Disconnected = 0,
    Connected = 1,
    Connecting = 2,
    Reconnecting = 3,
    Unknown = 4
}
