import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = ''

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_api}/api/auth/login`
  }
  
  login(user: any): Observable<any>{
    console.log("i am serving")
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    const response = this.http.post(`${this.baseUrl}`, user, {headers: headers})
    return response
  }
}
