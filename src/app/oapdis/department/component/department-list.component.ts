import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DeparmentList } from '../model/department-list';
import { DepartmentService } from '../service/department.service';

@Component({
    selector: 'app-department-list',
    templateUrl: './department-list.component.html',
    styles: [
    ],
    providers: [MessageService, ConfirmationService]
})
export class DepartmentListComponent implements OnInit {

    data: DeparmentList[] = [];

    constructor(private departmentService: DepartmentService, private messageService: MessageService, private confirmationService: ConfirmationService) {

    }

    ngOnInit(): void {
        this.departmentService.getList().subscribe((res: any) => {
            this.data = res.data;
            this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.data.length + " Kayıt Listelendi" });
        });
    }

    delete(data: DeparmentList) {
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
                this.departmentService.delete(data).subscribe((res: any) => {
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
