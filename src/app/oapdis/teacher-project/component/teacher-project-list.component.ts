import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TeacherProjectList } from '../model/teacher-project-list';
import { TeacherProjectService } from '../service/teacher-project.service';
import { TeacherService } from '../../teacher/service/teacher.service';
import { DecodeService } from '../../service/decode.service';
import { SignalRService } from '../../service/signalR.service';

@Component({
    selector: 'app-teacher-project-list',
    templateUrl: './teacher-project-list.component.html',
    styles: [
    ],
    providers: [MessageService, ConfirmationService]
})
export class TeacherProjectListComponent implements OnInit {

    data: TeacherProjectList[] = [];

    loading: boolean = true;

    userId: number;

    constructor(private teacherProjectService: TeacherProjectService, private teacherService: TeacherService, private decosedeService: DecodeService, private messageService: MessageService, private confirmationService: ConfirmationService,private signalRService: SignalRService) {

    }

    ngOnInit(): void {
        this.teacherService.getByUserId(this.decosedeService.getUserId()).subscribe((res: any) => {
            this.userId = res.data.userId;
            this.teacherProjectService.getListByUserId(this.userId).subscribe((res: any) => {
                this.data = res.data;
                this.loading = false;
                this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.data.length + " Kayıt Listelendi" });
            });
        });
    }

    delete(data: TeacherProjectList) {
        this.confirmationService.confirm({
            key: 'confirm1',
            target: event.target || new EventTarget,
            message: data.title + " " + data.firstName + " " + data.lastName + " kaydını silmek istediğine eminmisin",
            acceptButtonStyleClass: 'p-button-danger',
            acceptLabel: 'Evet',
            rejectLabel: 'Hayır',
            rejectButtonStyleClass: 'p-button-secondary',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.teacherProjectService.delete(data).subscribe((res: any) => {
                    this.signalRService.invoke();
                    this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.message });
                    setTimeout(() => {
                        window.location.reload();
                    }, 700);
                },
                    (error) => {
                        //this.messageService.add({ severity: 'danger', summary: 'Danger', detail: error.error });
                    });
            }
        });
    }

    clear(table: Table) {
        table.clear();
    }

}
