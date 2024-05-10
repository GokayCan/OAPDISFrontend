import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TeacherProject } from '../model/teacher-project';
import { TeacherProjectService } from '../service/teacher-project.service';
import { TeacherService } from '../../teacher/service/teacher.service';
import { DecodeService } from '../../service/decode.service';
import { SignalRService } from '../../service/signalR.service';

@Component({
    selector: 'app-teacher-project-form',
    templateUrl: './teacher-project-form.component.html',
    styles: [
    ],
    providers: [MessageService]
})
export class TeacherProjectFormComponent implements OnInit {

    data: TeacherProject = new TeacherProject();

    @ViewChild('teacherProjectForm') form: any;
    id: number = 0;
    teacherId: number;
    date: Date = new Date();
    loading: boolean = false;

    constructor(private teacherProjectService: TeacherProjectService,
        private teahcerService: TeacherService,
        private decodeService: DecodeService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
        private signalRService: SignalRService) {

    }

    ngOnInit(): void {
        this.teahcerService.getByUserId(this.decodeService.getUserId()).subscribe((res: any) => {
            this.teacherId = res.data.id
        })
        this.route.params.subscribe(params => {
            this.id = params["id"];
            if (this.id > 0) {
                this.teacherProjectService.get(this.id).subscribe((res: any) => {
                    if (res.data == null) {
                        this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: "Böyle Bir Proje Bulunamadı!" });
                        setTimeout(() => {
                            this.router.navigate(["/teacher-project"]);
                        }, 1000);
                    }
                    else if (this.decodeService.getTeacherId() != res.data.teacherId) {
                        this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: "Bu Sayfaya Erişim İzniniz Yok!" });
                        setTimeout(() => {
                            this.router.navigate(["/teacher-project"]);
                        }, 1000);
                    }
                    else
                        this.data = res.data;
                });
            }
        });
    }

    save() {
        if (this.form.invalid) {
            this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: "Forumun Doldurulduğundan Emin Olun!" });
            return;
        }
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.data.teacherId = this.teacherId;
        this.data.date = new Date(this.date);
        this.data.date = new Date(Date.UTC(this.data.date.getFullYear(), this.data.date.getMonth(), this.data.date.getDate(), this.data.date.getHours(), this.data.date.getMinutes(), this.data.date.getSeconds()));
        this.data.date = new Date(this.data.date.toISOString());
        if (this.id == undefined) {
            this.teacherProjectService.add(this.data).subscribe((res: any) => {
                //invoke
                this.signalRService.invoke();
                this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.message });
                setTimeout(() => {
                    this.router.navigate(["/teacher-project"]);
                }, 700);
            },
                (error) => {
                    this.loading = false;
                    //this.messageService.add({ severity: 'danger', summary: 'Danger', detail: error.error });
                });
        } else {
            this.teacherProjectService.update(this.data).subscribe((res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.message });
                setTimeout(() => {
                    this.router.navigate(["/teacher-project"]);
                }, 700);
            },
                (error) => {
                    this.loading = false;
                    //this.messageService.add({ severity: 'danger', summary: 'Danger', detail: error.error });
                });
        }
    }

}
