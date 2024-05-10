import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UserList } from '../model/user-list';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<UserList[]> {
    return this.httpClient.get<UserList[]>(environment.apiUrl + "Users/GetList");
  }

  get(id: number): Observable<User> {
    return this.httpClient.get<User>(environment.apiUrl + "Users/GetById/" + id);
  }

  add(user: any): Observable<User> {
    return this.httpClient.post<any>(environment.apiUrl + "Users/Add", user);
  }

  update(user: any): Observable<User> {
    return this.httpClient.post<any>(environment.apiUrl + "Users/Update", user);
  }

  delete(user: UserList): Observable<UserList> {
    return this.httpClient.post<UserList>(environment.apiUrl + "Users/Delete", user);
  }
}
