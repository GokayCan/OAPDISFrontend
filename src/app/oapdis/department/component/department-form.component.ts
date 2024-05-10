import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Department } from '../model/department';
import { DepartmentService } from '../service/department.service';
import { Faculty } from '../../faculty/model/faculty';
import { FacultyService } from '../../faculty/service/faculty.service';

@Component({
    selector: 'app-department-form',
    templateUrl: './department-form.component.html',
    styles: [
    ],
    providers: [MessageService]
})
export class DepartmentFormComponent implements OnInit {

    data: Department = new Department();

    faculties: Faculty[] = [];
    selectedFaculty: Faculty = new Faculty();

    id: number = 0;

    loading: boolean = false;
    @ViewChild('departmentForm') departmentForm: any;

    constructor(private departmentService: DepartmentService, private facultyService: FacultyService, private messageService: MessageService, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit(): void {
        this.facultyService.getList().subscribe((res: any) => {
            this.faculties = res.data;
        });
        this.route.params.subscribe(params => {
            this.id = params["id"];
            if (this.id > 0) {
                this.departmentService.get(this.id).subscribe((res: any) => {
                    this.data = res.data;
                });
            }
        });
    }

    save() {
        if (this.departmentForm.invalid) {
            this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: "Forumun Doldurulduğundan Emin Olun!" });
            return;
        }
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.data.facultyId = this.selectedFaculty.id;
        if (this.id == undefined) {
            this.departmentService.add(this.data).subscribe((res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.message });
                setTimeout(() => {
                    this.router.navigate(["/department"]);
                }, 700);
            },
                (error) => {
                    this.loading = false;
                    //this.messageService.add({ severity: 'danger', summary: 'Danger', detail: error.error });
                });
        } else {
            this.departmentService.update(this.data).subscribe((res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.message });
                setTimeout(() => {
                    this.router.navigate(["/department"]);
                }, 700);
            },
                (error) => {
                    this.loading = false;
                    //this.messageService.add({ severity: 'danger', summary: 'Danger', detail: error.error });
                });
        }
    }

}
