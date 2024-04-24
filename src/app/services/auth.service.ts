import { Injectable, isStandalone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  baseUrl: string = ''

  constructor(private http: HttpClient) {
    this.baseUrl = "https://smmi-api-production.up.railway.app/api/auth/login"
  }
  
  login(data: any): Observable<any>{
    console.log("i am serving")
    return this.http.post(`${this.baseUrl}`, data)
  }
}
