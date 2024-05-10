import { Component, OnInit, ViewChild } from '@angular/core';
import { Faculty } from '../model/faculty';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyService } from '../service/faculty.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-faculty-form',
    templateUrl: './faculty-form.component.html',
    styles: [
    ],
    providers: [MessageService]
})
export class FacultyFormComponent implements OnInit {

    data: Faculty = new Faculty();

    id: number = 0;
    loading: boolean = false;
    @ViewChild('facultyForm') facultyForm: any;
    constructor(private facultService: FacultyService, private messageService: MessageService, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params["id"];
            if (this.id > 0) {
                this.facultService.get(this.id).subscribe((res: any) => {
                    this.data = res.data;
                });
            }
        });
    }

    save() {
        if (this.facultyForm.invalid) {
            this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: "Forumun Doldurulduğundan Emin Olun!" });
            return;
        }
        if (this.loading) {
            return;
        }
        this.loading = true;
        if (this.id == undefined) {
            this.facultService.add(this.data).subscribe((res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.message });
                setTimeout(() => {
                    this.router.navigate(["/faculty"]);
                }, 700);
            },
                (error) => {
                    this.loading = false;
                    //this.messageService.add({ severity: 'danger', summary: 'Danger', detail: error.error });
                });
        } else {
            this.facultService.update(this.data).subscribe((res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.message });
                setTimeout(() => {
                    this.router.navigate(["/faculty"]);
                }, 700);
            },
                (error) => {
                    this.loading = false;
                    //this.messageService.add({ severity: 'danger', summary: 'Danger', detail: error.error });
                });
        }
    }

}
