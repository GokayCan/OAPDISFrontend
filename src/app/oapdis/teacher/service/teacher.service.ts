import { Inject, Injectable } from '@angular/core';
import { TeacherList } from '../model/teacher-lits';
import { Teacher } from '../model/teacher';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TeacherService {

    constructor(private httpClient: HttpClient) { }

    getList(): Observable<TeacherList[]> {
        return this.httpClient.get<TeacherList[]>(environment.apiUrl + "Teachers/GetList");
    }

    getMostProductiveTeacher(): Observable<any> {
        return this.httpClient.get<any>(environment.apiUrl + "Teachers/GetMostProductiveTeacher");
    }

    get(id: number): Observable<Teacher> {
        return this.httpClient.get<Teacher>(environment.apiUrl + "Teachers/GetById/" + id);
    }

    getByUserId(id: number): Observable<Teacher> {
        return this.httpClient.get<Teacher>(environment.apiUrl + "Teachers/GetByUserId/" + id);
    }

    add(teacher: any): Observable<Teacher> {
        return this.httpClient.post<any>(environment.apiUrl + "Teachers/Add", teacher);
    }

    update(teacher: any): Observable<Teacher> {
        return this.httpClient.post<any>(environment.apiUrl + "Teachers/Update", teacher);
    }

    delete(teacher: TeacherList): Observable<TeacherList> {
        return this.httpClient.post<TeacherList>(environment.apiUrl + "Teachers/Delete", teacher);
    }
}
