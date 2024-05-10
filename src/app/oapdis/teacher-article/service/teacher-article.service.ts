import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeacherArticle } from '../model/teacher-article';
import { TeacherArticleList } from '../model/teacher-article-list';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TeacherArticleService {

    constructor(private httpClient: HttpClient) { }

    getList(): Observable<TeacherArticleList[]> {
        return this.httpClient.get<TeacherArticleList[]>(environment.apiUrl + "TeacherArticles/GetList");
    }

    getListByUserId(id: number): Observable<TeacherArticleList[]> {
        return this.httpClient.get<TeacherArticleList[]>(environment.apiUrl + "TeacherArticles/GetListByUserId/" + id);
    }

    get(id: number): Observable<TeacherArticle> {
        return this.httpClient.get<TeacherArticle>(environment.apiUrl + "TeacherArticles/GetById/" + id);
    }

    add(teacherArticle: any): Observable<TeacherArticle> {
        return this.httpClient.post<any>(environment.apiUrl + "TeacherArticles/Add", teacherArticle);
    }

    update(teacherArticle: any): Observable<TeacherArticle> {
        return this.httpClient.post<any>(environment.apiUrl + "TeacherArticles/Update", teacherArticle);
    }

    delete(teacherArticle: TeacherArticleList): Observable<TeacherArticleList> {
        return this.httpClient.post<TeacherArticleList>(environment.apiUrl + "TeacherArticles/Delete", teacherArticle);
    }
}
