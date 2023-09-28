import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators}from'@angular/forms';
import { Libro } from './interfaces/libros';
import { LibrosService } from './servicios/libros.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  listaLibros:Libro[]=[];
  formularioLibro:FormGroup;
  
  constructor (
    private _ServicioLibro:LibrosService,
    private fb:FormBuilder
  ){

    this.formularioLibro = this.fb.group({
        nombreLibro:['',Validators.required],
        autor:['',Validators.required],
        editorial:['',Validators.required],
        paginas:['',Validators.required],
        estadoLibro:['',Validators.required]
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
      const request:Libro = {
        idLibro: 0,
        nombreLibro: this.formularioLibro.value.nombreLibro,
        autor: this.formularioLibro.value.autor,
        editorial: this.formularioLibro.value.editorial,
        paginas: this.formularioLibro.value.paginas,
        estadoLibro: this.formularioLibro.value.estadoLibro
      }
  this._ServicioLibro.add(request).subscribe({
    next:(data)=>{
        this.listaLibros.push(data);
        this.formularioLibro.patchValue({
          nombreLibro:"",
          autor:"",
          editorial:"",
          paginas:"",
          estadoLibro:""
          });
        },error:(e)=>{}
      });
  }

    eliminarLibro(libro:Libro){
      this._ServicioLibro.delete(libro.idLibro).subscribe({
        next:(data)=>{
            const nuevoLibro = this.listaLibros.filter(item => item.idLibro != libro.idLibro)
            this.listaLibros = nuevoLibro;
        },error:(e)=>{}
    });
  }
}
