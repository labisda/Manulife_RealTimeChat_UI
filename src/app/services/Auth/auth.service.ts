import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from 'src/app/models/UserInterface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  userId!: number;

  public login(userData: LoginUser) {
    const url = environment.backendUrl + "/api/login";
    return this.http.post<LoginUser>(url, userData);
  }
  

}
