import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppComponent } from '../app.component';
 

interface Producto {  
  id: Number;  
  titulo: String;  
  img: String;  
  textocorto: String;  
  caracteristicas: String;  
  precio: String;
  categoria: Number;  
} 

@Component({
  selector: 'app-cartasproductos',
  templateUrl: './cartasproductos.component.html',
  styleUrls: ['./cartasproductos.component.css']
})

 
export class CartasproductosComponent implements OnInit {
  
  
  
  @Input() productos: Producto[];
  @Input() categoria: Number;

  @Output() Eventocambiarcategoria = new EventEmitter<number>();

  constructor() { 

    this.productos = [];
    this.categoria = 0;
  }

  ngOnInit(): void {


  }

  Cambiarcategorias (numero: number ): void {
    this.Eventocambiarcategoria.emit(numero);
  }



}
