import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login.component';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    }
]


@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        InputTextModule,
        FormsModule,
        PasswordModule,
        ButtonModule,
        ToastModule
    ],
    exports: [
        LoginComponent
    ]
})
export class LoginModule { }
