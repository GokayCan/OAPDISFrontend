import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherProjectListComponent } from './component/teacher-project-list.component';
import { TeacherProjectFormComponent } from './component/teacher-project-form.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { CalendarModule } from 'primeng/calendar';

const routes: Routes = [
  {
    path: '',
    component: TeacherProjectListComponent
  },
  {
    path: 'form',
    component: TeacherProjectFormComponent
  },
  {
    path: 'form/:id',
    component: TeacherProjectFormComponent
  }
]


@NgModule({
  declarations: [
    TeacherProjectListComponent,
    TeacherProjectFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DropdownModule,
    TableModule,
    ToastModule,
    ConfirmDialogModule,
    MessagesModule,
    CalendarModule
  ]
})
export class TeacherProjectModule { }
