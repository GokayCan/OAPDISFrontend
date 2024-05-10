import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Faculty } from '../model/faculty';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<Faculty[]> {
    return this.httpClient.get<Faculty[]>(environment.apiUrl + "Faculties/GetList");
  }

  get(id: number): Observable<Faculty> {
    return this.httpClient.get<Faculty>(environment.apiUrl + "Faculties/GetById/" + id);
  }

  add(faculty: Faculty): Observable<Faculty> {
    return this.httpClient.post<Faculty>(environment.apiUrl + "Faculties/Add", faculty);
  }

  update(faculty: Faculty): Observable<Faculty> {
    return this.httpClient.post<Faculty>(environment.apiUrl + "Faculties/Update", faculty);
  }

  delete(faculty: Faculty): Observable<Faculty> {
    return this.httpClient.post<Faculty>(environment.apiUrl + "Faculties/Delete", faculty);
  }
}
