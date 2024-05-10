import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentFormComponent } from './component/department-form.component';
import { RouterModule, Routes } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DepartmentListComponent } from './component/department-list.component';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';

const routes: Routes = [
    {
        path: '',
        component: DepartmentListComponent
    },
    {
        path: 'form',
        component: DepartmentFormComponent
    },
    {
        path: 'form/:id',
        component: DepartmentFormComponent
    }
]

@NgModule({
    declarations: [
        DepartmentFormComponent,
        DepartmentListComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        InputTextModule,
        MessagesModule,
        ToastModule,
        TableModule,
        FormsModule,
        ButtonModule,
        DropdownModule,
        ConfirmDialogModule
    ],
    exports: [
        DepartmentFormComponent,
        DepartmentFormComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class DepartmentModule { }
