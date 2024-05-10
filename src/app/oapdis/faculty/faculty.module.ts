import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyFormComponent } from './compenent/faculty-form.component';
import { FacultyListComponent } from './compenent/faculty-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';

const routes: Routes = [
    {
        path: '',
        component: FacultyListComponent
    },
    {
        path: 'form',
        component: FacultyFormComponent
    },
    {
        path: 'form/:id',
        component: FacultyFormComponent
    }
]

@NgModule({
    declarations: [
        FacultyFormComponent,
        FacultyListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        ToastModule,
        ConfirmDialogModule,
        TableModule,
        ButtonModule,
        RouterModule.forChild(routes),
        MessagesModule
    ],
    exports: [
        FacultyFormComponent,
        FacultyListComponent
    ]
})
export class FacultyModule { }
