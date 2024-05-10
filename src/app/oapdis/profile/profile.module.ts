import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './component/profile.component';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';



const routes: Routes = [
    {
        path: '',
        component: ProfileComponent
    }
]

@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ImageModule,
        PasswordModule,
        FileUploadModule,
        InputTextModule,
        ButtonModule,
        ToastModule,
        StepsModule
    ],
    exports: [
        ProfileComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileModule { }
