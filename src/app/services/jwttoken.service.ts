import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwttokenService {

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem('token', token)
  }

  getDecodeToken(token: string){
    return jwtDecode(token)
  }

  getToken(): string | null{
    return localStorage.getItem('token')
  }
}
