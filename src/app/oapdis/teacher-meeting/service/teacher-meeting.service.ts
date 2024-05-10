import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeacherMeeting } from '../model/teacher-meeting';
import { TeacherMeetingList } from '../model/teachermeeting-list';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherMeetingService {

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<TeacherMeetingList[]> {
    return this.httpClient.get<TeacherMeetingList[]>(environment.apiUrl + "TeacherMeetings/GetList");
  }

  getListByUserId(id: number): Observable<TeacherMeetingList[]> {
    return this.httpClient.get<TeacherMeetingList[]>(environment.apiUrl + "TeacherMeetings/GetListByUserId/" + id);
  }

  get(id: number): Observable<TeacherMeeting> {
    return this.httpClient.get<TeacherMeeting>(environment.apiUrl + "TeacherMeetings/GetById/" + id);
  }

  getByUserId(id: number): Observable<TeacherMeeting> {
    return this.httpClient.get<TeacherMeeting>(environment.apiUrl + "TeacherMeetings/GetByUserId/" + id);
  }

  add(teacherMeeting: any): Observable<TeacherMeeting> {
    return this.httpClient.post<any>(environment.apiUrl + "TeacherMeetings/Add", teacherMeeting);
  }

  update(teacherMeeting: any): Observable<TeacherMeeting> {
    return this.httpClient.post<any>(environment.apiUrl + "TeacherMeetings/Update", teacherMeeting);
  }

  delete(teacherMeeting: TeacherMeetingList): Observable<TeacherMeetingList> {
    return this.httpClient.post<TeacherMeetingList>(environment.apiUrl + "TeacherMeetings/Delete", teacherMeeting);
  }
}
