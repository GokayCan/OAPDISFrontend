import { Component, OnInit } from '@angular/core';
import { TeacherList } from '../model/teacher-lits';
import { TeacherService } from '../service/teacher.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SignalRService } from '../../service/signalR.service';

@Component({
    selector: 'app-teacher-list',
    templateUrl: './teacher-list.component.html',
    styles: [
    ],
    providers: [MessageService, ConfirmationService]
})
export class TeacherListComponent implements OnInit {

    data: TeacherList[] = [];

    loading: boolean = true;

    constructor(private teahcerService: TeacherService, private messageService: MessageService, private confirmationService: ConfirmationService,private signalRService: SignalRService) {

    }

    ngOnInit(): void {
        this.teahcerService.getList().subscribe((res: any) => {
            this.data = res.data;
            this.loading = false;
            this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.data.length + " Kayıt Listelendi" });
        });
    }

    delete(data: TeacherList) {
        this.confirmationService.confirm({
            key: 'confirm1',
            target: event.target || new EventTarget,
            message: data.firstName + " " + data.lastName + " kaydını silmek istediğine eminmisin",
            acceptButtonStyleClass: 'p-button-danger',
            acceptLabel: 'Evet',
            rejectLabel: 'Hayır',
            rejectButtonStyleClass: 'p-button-secondary',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.teahcerService.delete(data).subscribe((res: any) => {
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
