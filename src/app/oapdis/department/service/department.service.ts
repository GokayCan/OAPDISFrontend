import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../model/department';
import { DeparmentList } from '../model/department-list';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {

    constructor(private httpClient: HttpClient) { }

    getList(): Observable<DeparmentList[]> {
        return this.httpClient.get<DeparmentList[]>(environment.apiUrl + "Departments/GetList");
    }

    getMostProductiveDepartment(): Observable<any> {
        return this.httpClient.get<any>(environment.apiUrl + "Departments/GetMostProductiveDepartment");
    }

    get(id: number): Observable<Department> {
        return this.httpClient.get<Department>(environment.apiUrl + "Departments/GetById/" + id);
    }

    add(department: Department): Observable<Department> {
        return this.httpClient.post<Department>(environment.apiUrl + "Departments/Add", department);
    }

    update(department: Department): Observable<Department> {
        return this.httpClient.post<Department>(environment.apiUrl + "Departments/Update", department);
    }

    delete(department: DeparmentList): Observable<DeparmentList> {
        return this.httpClient.post<DeparmentList>(environment.apiUrl + "Departments/Delete", department);
    }
}
