import { Component, OnInit, ViewChild } from '@angular/core';
import { TeacherService } from '../service/teacher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Department } from '../../department/model/department';
import { DepartmentService } from '../../department/service/department.service';
import { Teacher } from '../model/teacher';
import { SignalRService } from '../../service/signalR.service';

@Component({
    selector: 'app-teacher-form',
    templateUrl: './teacher-form.component.html',
    styles: [
    ],
    providers: [MessageService]
})
export class TeacherFormComponent implements OnInit {

    data: Teacher = new Teacher();

    departments: Department[] = [];
    selectedDepartment: Department = new Department();

    image: File = undefined;

    loading: boolean = false;
    @ViewChild('teacherForm') teacherForm: any;

    uploadedFiles: any[] = [];

    id: number = 0;

    constructor(private teacherService: TeacherService, private departmentService: DepartmentService, private messageService: MessageService, private route: ActivatedRoute, private router: Router,private signalRService: SignalRService) {

    }

    ngOnInit(): void {
        this.departmentService.getList().subscribe((res: any) => {
            this.departments = res.data;
        });
        this.route.params.subscribe(params => {
            this.id = params["id"];
            if (this.id > 0) {
                this.teacherService.get(this.id).subscribe((res: any) => {
                    this.data = res.data;
                });
            }
        });
    }

    save() {
        if (this.teacherForm.invalid) {
            this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: "Forumun Doldurulduğundan Emin Olun!" });
            return;
        }
        if (this.loading) {
            return;
        }
        this.loading = true;

        this.data.departmentId = this.selectedDepartment.id;
        this.data.typeId = 2

        let formData = new FormData();

        formData.append('firstName', this.data.firstName);
        formData.append('lastName', this.data.lastName);
        formData.append('title', this.data.title);
        formData.append('task', this.data.task);
        formData.append('phoneNumber', this.data.phoneNumber);
        formData.append('email', this.data.email);
        formData.append('departmentId', this.data.departmentId.toString());
        formData.append('typeId', this.data.typeId.toString());

        if (this.id == undefined) {
            if (this.image == undefined) {
                this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: "Forumun Doldurulduğundan Emin Olun!" });
                this.loading = false;
                return;
            }
            this.data.password = "123456";
            formData.append('image', this.image, this.image.name)
            formData.append('password', this.data.password);

            this.teacherService.add(formData).subscribe((res: any) => {
                this.signalRService.invoke();
                this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.message });
                setTimeout(() => {
                    this.router.navigate(["/teacher"]);
                }, 700);
            },
                (error) => {
                    this.loading = false;
                    //this.messageService.add({ severity: 'danger', summary: 'Danger', detail: error.error });
                });
        } else {
            formData.append('id', this.data.id.toString());
            formData.append('userId', this.data.userId.toString());
            if (this.image != undefined) {
                formData.append('image', this.image, this.image.name)
            }
            this.teacherService.update(formData).subscribe((res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.message });
                setTimeout(() => {
                    this.router.navigate(["/teacher"]);
                }, 700);
            },
                (error) => {
                    this.loading = false;
                    //this.messageService.add({ severity: 'danger', summary: 'Danger', detail: error.error });
                });
        }
    }

    onUpload(event: any) {
        this.image = event.files[0];
    }

    onClear() {
        this.image = undefined;
    }

}
