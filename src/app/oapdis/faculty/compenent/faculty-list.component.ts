import { Component, OnInit } from '@angular/core';
import { Faculty } from '../model/faculty';
import { FacultyService } from '../service/faculty.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-faculty-list',
    templateUrl: './faculty-list.component.html',
    styles: [
    ],
    providers: [MessageService, ConfirmationService]
})
export class FacultyListComponent implements OnInit {

    data: Faculty[] = [];

    constructor(private facultyService: FacultyService, private messageService: MessageService, private confirmationService: ConfirmationService) {

    }

    ngOnInit(): void {
        this.facultyService.getList().subscribe((res: any) => {
            this.data = res.data;
            this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.data.length + " Kayıt Listelendi" });
        });
    }

    delete(data: Faculty) {
        this.confirmationService.confirm({
            key: 'confirm1',
            target: event.target || new EventTarget,
            message: data.name + " kaydını silmek istediğine eminmisin",
            acceptButtonStyleClass: 'p-button-danger',
            acceptLabel: 'Evet',
            rejectLabel: 'Hayır',
            rejectButtonStyleClass: 'p-button-secondary',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.facultyService.delete(data).subscribe((res: any) => {
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

}
