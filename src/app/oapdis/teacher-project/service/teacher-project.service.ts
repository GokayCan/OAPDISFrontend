import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeacherProject } from '../model/teacher-project';
import { TeacherProjectList } from '../model/teacher-project-list';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherProjectService {

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<TeacherProjectList[]> {
    return this.httpClient.get<TeacherProjectList[]>(environment.apiUrl + "TeacherProjects/GetList");
  }

  getListByUserId(id: number): Observable<TeacherProjectList[]> {
    return this.httpClient.get<TeacherProjectList[]>(environment.apiUrl + "TeacherProjects/GetListByUserId/" + id);
  }

  get(id: number): Observable<TeacherProject> {
    return this.httpClient.get<TeacherProject>(environment.apiUrl + "TeacherProjects/GetById/" + id);
  }

  getByUserId(id: number): Observable<TeacherProject> {
    return this.httpClient.get<TeacherProject>(environment.apiUrl + "TeacherProjects/GetByUserId/" + id);
  }

  add(teacherproject: any): Observable<TeacherProject> {
    return this.httpClient.post<any>(environment.apiUrl + "TeacherProjects/Add", teacherproject);
  }

  update(teacherproject: any): Observable<TeacherProject> {
    return this.httpClient.post<any>(environment.apiUrl + "TeacherProjects/Update", teacherproject);
  }

  delete(teacherproject: TeacherProjectList): Observable<TeacherProjectList> {
    return this.httpClient.post<TeacherProjectList>(environment.apiUrl + "TeacherProjects/Delete", teacherproject);
  }
}
