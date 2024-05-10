import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TeacherMeetingList } from '../model/teachermeeting-list';
import { TeacherMeetingService } from '../service/teacher-meeting.service';
import { TeacherService } from '../../teacher/service/teacher.service';
import { DecodeService } from '../../service/decode.service';
import { SignalRService } from '../../service/signalR.service';

@Component({
    selector: 'app-teacher-meeting',
    templateUrl: './teacher-meeting-list.component.html',
    styles: [
    ],
    providers: [ConfirmationService, MessageService]
})
export class TeacherMeetingListComponent implements OnInit {

    data: TeacherMeetingList[] = [];

    loading: boolean = true;

    userId: number;

    constructor(private teacherMeetingService: TeacherMeetingService, private teacherService: TeacherService, private decodeService: DecodeService, private messageService: MessageService, private confirmationService: ConfirmationService,private signalRService: SignalRService) {

    }

    ngOnInit(): void {
        this.teacherService.getByUserId(this.decodeService.getUserId()).subscribe((res: any) => {
            this.userId = res.data.userId;
            this.teacherMeetingService.getListByUserId(this.userId).subscribe((res: any) => {
                this.data = res.data;
                this.loading = false;
                this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.data.length + " Kayıt Listelendi" });
            });
        });
    }

    delete(data: TeacherMeetingList) {
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
                this.teacherMeetingService.delete(data).subscribe((res: any) => {
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
