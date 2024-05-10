import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DecodeService } from '../../service/decode.service';
import { TeacherService } from '../../teacher/service/teacher.service';
import { TeacherMeeting } from '../model/teacher-meeting';
import { TeacherMeetingService } from '../service/teacher-meeting.service';
import { SignalRService } from '../../service/signalR.service';

@Component({
    selector: 'app-teacher-meeting-form',
    templateUrl: './teacher-meeting-form.component.html',
    styles: [
    ],
    providers: [MessageService]
})
export class TeacherMeetingFormComponent implements OnInit {

    data: TeacherMeeting = new TeacherMeeting();

    @ViewChild('teacherMeetingForm') form: any;
    id: number = 0;
    teacherId: number;
    date: Date = new Date();
    loading: boolean = false;

    constructor(private teacherMeetingService: TeacherMeetingService,
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
                this.teacherMeetingService.get(this.id).subscribe((res: any) => {
                    if (res.data == null) {
                        this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: "Böyle Bir Toplantı Bulunamadı!" });
                        setTimeout(() => {
                            this.router.navigate(["/teacher-meeting"]);
                        }, 1000);
                    }
                    else if (this.decodeService.getTeacherId() != res.data.teacherId) {
                        this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: "Bu Sayfaya Erişim İzniniz Yok!" });
                        setTimeout(() => {
                            this.router.navigate(["/teacher-meeting"]);
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
            this.teacherMeetingService.add(this.data).subscribe((res: any) => {
                //invoke
                this.signalRService.invoke();
                this.signalRService.invokeCalendar(this.data.date);
                this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.message });
                setTimeout(() => {
                    this.router.navigate(["/teacher-meeting"]);
                }, 700);
            },
                (error) => {
                    this.loading = false;
                    //this.messageService.add({ severity: 'danger', summary: 'Danger', detail: error.error });
                });
        } else {
            this.teacherMeetingService.update(this.data).subscribe((res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.message });
                setTimeout(() => {
                    this.router.navigate(["/teacher-meeting"]);
                }, 700);
            },
                (error) => {
                    this.loading = false;
                    //this.messageService.add({ severity: 'danger', summary: 'Danger', detail: error.error });
                });
        }
    }

}
