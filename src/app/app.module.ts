import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { OapdisModule } from './oapdis/oapdis.module';
import { LoginModule } from './oapdis/login/login.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './oapdis/interceptor/error.interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './oapdis/interceptor/auth.interceptor';
import { DecodeService } from './oapdis/service/decode.service';
import { RoleGuard } from './oapdis/login/guard/role.guard';
import { AuthGuard } from './oapdis/login/guard/auth.guard';
import { SignalRService } from './oapdis/service/signalR.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        LoginModule,
        OapdisModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => localStorage.getItem("oapdisToken"),
            },
        }),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
        MessageService,
        DecodeService,
        JwtHelperService,
        MessageService,
        ConfirmationService,
        AuthGuard,
        RoleGuard,
        SignalRService,
        //{ provide: LocationStrategy, useClass: HashLocationStrategy },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
