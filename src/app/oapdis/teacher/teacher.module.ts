import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherFormComponent } from './component/teacher-form.component';
import { TeacherListComponent } from './component/teacher-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { TeacherDetailComponent } from './component/teacher-detail.component';
import { ConfirmationService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

const routes: Routes = [
    {
        path: '',
        component: TeacherListComponent
    },
    {
        path: 'form',
        component: TeacherFormComponent
    },
    {
        path: 'form/:id',
        component: TeacherFormComponent
    },
    {
        path: 'detail/:id',
        component: TeacherDetailComponent
    }
]

@NgModule({
    declarations: [
        TeacherFormComponent,
        TeacherListComponent,
        TeacherDetailComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        FileUploadModule,
        TableModule,
        ToastModule,
        ConfirmDialogModule,
        MessagesModule
    ],
    exports: [
        TeacherFormComponent,
        TeacherListComponent,
        TeacherDetailComponent
    ],
    providers: [ConfirmationService ]
})
export class TeacherModule { }
