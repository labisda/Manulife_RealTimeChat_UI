import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InsertUser } from 'src/app/models/UserInterface';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public createUsers(userData: InsertUser) {
    const url = environment.backendUrl + "/api/createUser";
    return this.http.post<InsertUser>(url, userData);
  }

}

