import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherMeetingListComponent } from './component/teacher-meeting-list.component';
import { TeacherMeetingFormComponent } from './component/teacher-meeting-form.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { CalendarModule } from 'primeng/calendar';

const routes: Routes = [
  {
    path: '',
    component: TeacherMeetingListComponent
  },
  {
    path: 'form',
    component: TeacherMeetingFormComponent
  },
  {
    path: 'form/:id',
    component: TeacherMeetingFormComponent
  }
]

@NgModule({
  declarations: [
    TeacherMeetingListComponent,
    TeacherMeetingFormComponent
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
export class TeacherMeetingModule { }
