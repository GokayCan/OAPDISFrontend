import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ConnectionState, SignalRService } from './oapdis/service/signalR.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig, private signalRService: SignalRService) { }

    async ngOnInit(): Promise<void> {
        this.primengConfig.ripple = true;
        await this.connectSignalR(); 
    }

    private async connectSignalR() {
        if (this.signalRService.getState() === ConnectionState.Connecting || this.signalRService.getState() === ConnectionState.Disconnected) {
            await this.signalRService.startConnection();
        }
    }
}
