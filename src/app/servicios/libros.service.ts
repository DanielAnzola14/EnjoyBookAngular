import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment.development';
import {Observable} from 'rxjs';
import { Libro } from '../interfaces/libros';


@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private endPoint:string = environment.endPoint;
  private apiUrl:string = this.endPoint+"Libros/";
  constructor(private http:HttpClient) {}

  getList():Observable<Libro[]>{
    return this.http.get<Libro[]>(`${this.apiUrl}Lista`);
  }

  add(request:Libro):Observable<Libro>{
    return this.http.post<Libro>(`${this.apiUrl}Agregar`,request);
 }

 delete(idLibro:number):Observable<void>{
  return this.http.delete<void>(`${this.apiUrl}Eliminar/${idLibro}`);
}
}
