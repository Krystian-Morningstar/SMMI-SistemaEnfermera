import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = ''

  constructor(private http: HttpClient) {
    this.baseUrl = "http://192.168.137.137:3000/api/auth/login"
  }
  
  login(user: any): Observable<any>{
    console.log("i am serving")
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    const response = this.http.post(`${this.baseUrl}`, user, {headers: headers})
    return response
  }
}
