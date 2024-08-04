import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'; 

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  register(nombre: string, apellidos: string, edad: number, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { nombre, apellidos, edad, email, password });
  }

  updateClient(id: number, nombre: string, apellidos: string, edad: number, email: string, password: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/clientes/${id}`, { nombre, apellidos, edad, email, password });
  }
}
