import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TeacherArticleList } from '../model/teacher-article-list';
import { TeacherArticleService } from '../service/teacher-article.service';
import { DecodeService } from '../../service/decode.service';
import { TeacherService } from '../../teacher/service/teacher.service';
import { SignalRService } from '../../service/signalR.service';

@Component({
    selector: 'app-teacher-article-list',
    templateUrl: './teacher-article-list.component.html',
    styles: [
    ],
    providers: [ConfirmationService, MessageService]
})
export class TeacherArticleListComponent implements OnInit {

    data: TeacherArticleList[] = [];

    loading: boolean = true;

    userId: number;

    constructor(private teacherArticleService: TeacherArticleService, private teacherService: TeacherService, private decodeService: DecodeService, private messageService: MessageService, private confirmationService: ConfirmationService,private signalRService: SignalRService) {

    }

    ngOnInit(): void {
        this.teacherService.getByUserId(this.decodeService.getUserId()).subscribe((res: any) => {
            this.userId = res.data.userId;
            this.teacherArticleService.getListByUserId(this.userId).subscribe((res: any) => {
                this.data = res.data;
                this.loading = false;
                this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.data.length + " Kayıt Listelendi" });
            });
        })

    }

    delete(data: TeacherArticleList) {
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
                this.teacherArticleService.delete(data).subscribe((res: any) => {
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
