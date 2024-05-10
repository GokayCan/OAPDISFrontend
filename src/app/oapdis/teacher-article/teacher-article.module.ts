import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherArticleFormComponent } from './component/teacher-article-form.component';
import { TeacherArticleListComponent } from './component/teacher-article-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { CalendarModule } from 'primeng/calendar';

const routes: Routes = [
    {
        path: '',
        component: TeacherArticleListComponent
    },
    {
        path: 'form',
        component: TeacherArticleFormComponent
    },
    {
        path: 'form/:id',
        component: TeacherArticleFormComponent
    }
]

@NgModule({
    declarations: [
        TeacherArticleFormComponent,
        TeacherArticleListComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        TableModule,
        ConfirmDialogModule,
        InputTextareaModule,
        FileUploadModule,
        InputTextModule,
        ButtonModule,
        ToastModule,
        MessagesModule,
        CalendarModule
    ]
})
export class TeacherArticleModule { }
