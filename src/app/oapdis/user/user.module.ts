import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './component/user-list.component';
import { UserFormComponent } from './component/user-form.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';

const routes: Routes = [
    {
        path: '',
        component: UserListComponent
    },
    {
        path: 'form',
        component: UserFormComponent
    },
    {
        path: 'form/:id',
        component: UserFormComponent
    }
];


@NgModule({
    declarations: [
        UserListComponent,
        UserFormComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        InputTextModule,
        ButtonModule,
        FileUploadModule,
        TableModule,
        ToastModule,
        ConfirmDialogModule,
        MessagesModule
    ],
    exports: [
        UserListComponent,
        UserFormComponent
    ]
})
export class UserModule { }
