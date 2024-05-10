import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../service/teacher.service';
import { TeacherArticleService } from '../../teacher-article/service/teacher-article.service';
import { TeacherMeetingService } from '../../teacher-meeting/service/teacher-meeting.service';
import { TeacherProjectService } from '../../teacher-project/service/teacher-project.service';
import { Teacher } from '../model/teacher';
import { ActivatedRoute } from '@angular/router';
import { TeacherMeetingList } from '../../teacher-meeting/model/teachermeeting-list';
import { TeacherArticleList } from '../../teacher-article/model/teacher-article-list';
import { TeacherProjectList } from '../../teacher-project/model/teacher-project-list';
import { MessageService } from 'primeng/api';
import { UserService } from '../../user/service/user.service';
import { User } from '../../user/model/user';
import { UserList } from '../../user/model/user-list';

@Component({
    selector: 'app-teacher-detail',
    templateUrl: './teacher-detail.component.html',
    styleUrls: []
})
export class TeacherDetailComponent implements OnInit {

    teacherId: number;
    teacher: Teacher = new Teacher();
    user: UserList = new UserList();
    teacherArticles: TeacherArticleList[] = [];
    teacherMeetings: TeacherMeetingList[] = [];
    teacherProjects: TeacherProjectList[] = [];

    loading: boolean = true;

    constructor(
        private teacherService: TeacherService,
        private teacherArticleService: TeacherArticleService,
        private teacherMeetingService: TeacherMeetingService,
        private teacherProjectService: TeacherProjectService,
        private userService: UserService,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.teacherId = +params['id'];
            this.getTeacher();
        });
    }

    getTeacher(): void {
        this.teacherService.get(this.teacherId).subscribe(async (res: any) => {
            this.teacher = res.data;
            this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Akademisyen Bilgileri Getirildi' });
            await this.getUser();
            await this.getTeacherArticles();
            await this.getTeacherMeetings();
            await this.getTeacherProjects();
            this.loading = false;
        });
    }

    async getUser(): Promise<void> {
        this.userService.get(+this.teacher.userId).subscribe((res: any) => {
            this.user = res.data;
        });
    }

    async getTeacherArticles(): Promise<void> {
        this.teacherArticleService.getListByUserId(+this.teacher.userId).subscribe((res: any) => {
            this.teacherArticles = res.data;
            this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.data.length + " Tane Makale Listelendi" });
        });
    }

    async getTeacherMeetings(): Promise<void> {
        this.teacherMeetingService.getListByUserId(+this.teacher.userId).subscribe((res: any) => {
            this.teacherMeetings = res.data;
            this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.data.length + " Tane Toplantı Listelendi" });
        });
    }

    async getTeacherProjects(): Promise<void> {
        this.teacherProjectService.getListByUserId(+this.teacher.userId).subscribe((res: any) => {
            this.teacherProjects = res.data;
            this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.data.length + " Tane Proje Listelendi" });
        });
    }

}
