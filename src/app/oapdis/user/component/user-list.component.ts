import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TeacherList } from '../../teacher/model/teacher-lits';
import { TeacherService } from '../../teacher/service/teacher.service';
import { UserList } from '../model/user-list';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styles: [
    ],
    providers: [MessageService, ConfirmationService]
})
export class UserListComponent implements OnInit {

    data: UserList[] = [];

    loading: boolean = true;

    constructor(private userService: UserService, private messageService: MessageService, private confirmationService: ConfirmationService) {

    }

    ngOnInit(): void {
        this.userService.getList().subscribe((res: any) => {
            this.data = res.data;
            this.loading = false;
            this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.data.length + " Kayıt Listelendi" });
        });
    }

    delete(data: UserList) {
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
                this.userService.delete(data).subscribe((res: any) => {
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
