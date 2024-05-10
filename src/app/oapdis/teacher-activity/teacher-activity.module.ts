import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TeacherActivityListComponent } from './component/teacher-activity-list.component';


const routes: Routes = [
    {
        path: '',
        component: TeacherActivityListComponent
    },

]


@NgModule({
    declarations: [
        TeacherActivityListComponent
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
    ],
    exports: [
        TeacherActivityListComponent
    ]
})
export class TeacherActivityModule { }
