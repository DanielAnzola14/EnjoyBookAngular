import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment.development';
import {Observable} from 'rxjs';
import { Libros } from '../interfaces/libros';


@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private endPoint:string = environment.endPoint;
  private apiUrl:string = this.endPoint+"Libro/"
  constructor(private http:HttpClient) {}

    getList():Observable<Libros[]>{

      return this.http.get<Libros[]>(`${this.apiUrl}Lista`);
   }

    add(request:Libros):Observable<Libros>{

    return this.http.post<Libros>(`${this.apiUrl}Agregar`,request);
 }

 delete(idLibro:number):Observable<void>{

  return this.http.delete<void>(`${this.apiUrl}Eliminar/${idLibro}`);
}
}
