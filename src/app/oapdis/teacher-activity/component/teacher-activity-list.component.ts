import { Component, OnInit } from '@angular/core';
import { TeacherProjectList } from '../../teacher-project/model/teacher-project-list';
import { TeacherArticleList } from '../../teacher-article/model/teacher-article-list';
import { TeacherMeetingList } from '../../teacher-meeting/model/teachermeeting-list';
import { TeacherArticleService } from '../../teacher-article/service/teacher-article.service';
import { TeacherMeetingService } from '../../teacher-meeting/service/teacher-meeting.service';
import { TeacherProjectService } from '../../teacher-project/service/teacher-project.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-teacher-activity-list',
    templateUrl: './teacher-activity-list.component.html',
    styles: [
    ],
    providers: [MessageService, ConfirmationService]
})
export class TeacherActivityListComponent implements OnInit {

    projects: TeacherProjectList[] = [];
    articles: TeacherArticleList[] = [];
    meetings: TeacherMeetingList[] = [];

    loading: boolean = true;


    constructor(private teacherArticleService: TeacherArticleService, private teacherMeetingService: TeacherMeetingService, private teacherProjectService: TeacherProjectService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {

        this.teacherProjectService.getList().subscribe((res: any) => {
            this.projects = res.data;
            this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.data.length + " Tane Proje Listelendi" });
        });

        this.teacherArticleService.getList().subscribe((res: any) => {
            this.articles = res.data;
            this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.data.length + " Tane Makale Listelendi" });
        });

        this.teacherMeetingService.getList().subscribe((res: any) => {
            this.meetings = res.data;
            this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.data.length + " Tane Toplantı Listelendi" });
        });
        this.loading = false;
    }
}
