import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DecodeService } from '../../service/decode.service';
import { TeacherService } from '../../teacher/service/teacher.service';
import { TeacherArticle } from '../model/teacher-article';
import { TeacherArticleService } from '../service/teacher-article.service';
import { SignalRService } from '../../service/signalR.service';

@Component({
    selector: 'app-teacher-article-form',
    templateUrl: './teacher-article-form.component.html',
    styles: [
    ],
    providers: [MessageService]
})
export class TeacherArticleFormComponent implements OnInit {

    data: TeacherArticle = new TeacherArticle();
    id: number = 0;
    teacherId: number;
    @ViewChild('teacherArticleForm') form: any;
    file: File = undefined;
    date: Date = new Date();
    loading: boolean = false;

    uploadedFiles: any[] = [];

    constructor(private teacherArticleService: TeacherArticleService,
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
                this.teacherArticleService.get(this.id).subscribe((res: any) => {
                    if (res.data == null) {
                        this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: "Böyle Bir Makale Bulunamadı!" });
                        setTimeout(() => {
                            this.router.navigate(["/teacher-article"]);
                        }, 1000);
                    }
                    else if (this.decodeService.getTeacherId() != res.data.teacherId) {
                        this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: "Bu Sayfaya Erişim İzniniz Yok!" });
                        setTimeout(() => {
                            this.router.navigate(["/teacher-article"]);
                        }, 1000);
                    }
                    else {
                        this.data = res.data;
                        this.date = new Date(this.data.date);
                    }
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
        let formData = new FormData();
        formData.append('file', this.file);
        formData.append('teacherId', this.teacherId.toString());
        formData.append('description', this.data.description);
        formData.append('title', this.data.title);
        this.data.date = new Date(this.date);
        this.data.date = new Date(Date.UTC(this.data.date.getFullYear(), this.data.date.getMonth(), this.data.date.getDate(), this.data.date.getHours(), this.data.date.getMinutes(), this.data.date.getSeconds()));
        formData.append('date', this.data.date.toISOString());

        if (this.id == undefined) {
            if (this.file == undefined) {
                this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: "Forumun Doldurulduğundan Emin Olun!" });
                this.loading = false;
                return;
            }
            this.teacherArticleService.add(formData).subscribe((res: any) => {
                //invoke
                this.signalRService.invoke();
                this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.message });
                setTimeout(() => {
                    this.router.navigate(["/teacher-article"]);
                }, 700);
            },
                (error) => {
                    this.loading = false;
                    //this.messageService.add({ severity: 'danger', summary: 'Danger', detail: error.error });
                });
        } else {
            formData.append('id', this.data.id.toString());
            formData.append('articleId', this.data.articleId.toString());
            this.teacherArticleService.update(formData).subscribe((res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.message });
                setTimeout(() => {
                    this.router.navigate(["/teacher-article"]);
                }, 700);
            },
                (error) => {
                    this.loading = false;
                    //this.messageService.add({ severity: 'danger', summary: 'Danger', detail: error.error });
                });
        }
    }

    onUpload(event: any) {
        this.file = event.files[0];
    }

    onClear() {
        this.file = undefined;
    }

}
