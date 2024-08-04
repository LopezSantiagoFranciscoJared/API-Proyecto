import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '../interfaces/menu';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor( private http: HttpClient) { }

  getMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${environment.apiUrl}/clientes`);  // Cambia la URL aquí
  }
}
