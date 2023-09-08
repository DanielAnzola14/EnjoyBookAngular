import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators}from'@angular/forms'
import { Libros } from './interfaces/libros';
import { LibrosService } from './servicios/libros.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  listaLibros:Libros[]=[];
  formularioLibro:FormGroup;
  
  constructor (
    private _ServicioLibro:LibrosService,
    private fb:FormBuilder
  ){

    this.formularioLibro = this.fb.group({
        nombre:['',Validators.required],
        autor:['',Validators.required],
        editorial:['',Validators.required],
        numPaginas:['',Validators.required],
        caracteristicas:['',Validators.required]
    });
  }

    obtenerLibros(){
      this._ServicioLibro.getList().subscribe({
        next:(data)=>{
          this.listaLibros = data;
        },error:(e)=>{}
      });
    }

    ngOnInit(): void {
      this.obtenerLibros();
    }

    agregarLibro(){
      const request:Libros = {
        idLibro: 0,
        nombreLibro: this.formularioLibro.value.nombre,
        autor: this.formularioLibro.value.autor,
        editorial: this.formularioLibro.value.editorial,
        numPaginas: this.formularioLibro.value.numPaginas,
        caracteristicas: this.formularioLibro.value.caracteristicas
      }
      this._ServicioLibro.add(request).subscribe({
        next:(data)=>{
          this.listaLibros.push(data);
          this.formularioLibro.patchValue({
            nombreLibro:"",
            autor:"",
            editorial:"",
            numPaginas:0,
            caracteristicas:""
          });
        },error:(e)=>{}
      });
    }

    eliminarLibro(libro:Libros){
      this._ServicioLibro.delete(libro.idLibro).subscribe({
        next:(data)=>{
            const nuevoLibro = this.listaLibros.filter(item => item.idLibro != libro.idLibro)
            this.listaLibros = nuevoLibro;
        },error:(e)=>{}
    });
  }
}
