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

interface Listacarrito {  
  id: Number;  
  titulo: String;  
  cantidad: Number;
}  

@Component({
  selector: 'app-cartasproductos',
  templateUrl: './cartasproductos.component.html',
  styleUrls: ['./cartasproductos.component.css']
})

 
export class CartasproductosComponent implements OnInit {
  


  @Input() listacarrito: Listacarrito[] = [];
  @Input() productos: Producto[];
  @Input() categoria: Number;

  //Eventos
  @Output() Eventocambiarcategoria = new EventEmitter<number>();
  @Output() Eventoaddcarrito= new EventEmitter<String>();
  @Output() EventoSumarCantidad= new EventEmitter<String>();


  constructor() { 
    this.productos = [];
    this.categoria = 0;
  }

 

  ngOnInit(): void {


  }

  Cambiarcategorias (numero: number ): void {
    this.Eventocambiarcategoria.emit(numero);
   
  }
  
  Addcarrito (articulo: String ): void {
    this.Eventoaddcarrito.emit(articulo);
    
  }

 


}
