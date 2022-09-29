import { Component, ViewChild } from '@angular/core';
import productosJson from '../assets/json/productos.json'; 
import {MatSidenav} from '@angular/material/sidenav';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  

  Todosproductos: Producto[] = productosJson;  

  Generalcategoria: Number = 0;

  Todoslistacarrito: Listacarrito[] = [];

  events: string[] = [];
  opened: boolean = true;

  constructor(){

    
  }

  Cambiarcategoria(numero: number): void{
    this.Generalcategoria = numero;
    
  }

  Addcarrito(articulo: String){


    
    if(this.Todoslistacarrito.findIndex(algo => algo.titulo == articulo) == -1){
      this.Todoslistacarrito.push({
        id: 1,
        titulo: String(articulo),
        cantidad: 1
      } as unknown as Listacarrito )
      
    }else {

      this.SumarCantidad(articulo);


    }

      
      
      this.sidenav.open(); //Abre el sidenav del carrito
      //MEJORAR ESTA PARTE
  }

  Eliminararticulo(identificador: Number){
    this.Todoslistacarrito.splice(Number(identificador),1);
    
  }



  SumarCantidad(identificador: String){
   // let temporal = this.Todoslistacarrito[Number(identificador)];
   //alert(this.Todoslistacarrito.findIndex(articulo => articulo.titulo == identificador));
    
    let temporal = this.Todoslistacarrito[this.Todoslistacarrito.findIndex(articulo => articulo.titulo == identificador)];


    this.Todoslistacarrito[this.Todoslistacarrito.findIndex(articulo => articulo.titulo == identificador)] = {
      id: temporal.id,
      titulo: temporal.titulo,
      cantidad: Number(temporal.cantidad) + 1
    }
  }

  RestarCantidad(identificador: Number){
    let temporal = this.Todoslistacarrito[Number(identificador)];
  
    if(temporal.cantidad == 1){
      this.Eliminararticulo(identificador);
    }else{
      this.Todoslistacarrito[Number(identificador)] = {
        id: temporal.id,
        titulo: temporal.titulo,
        cantidad: Number(temporal.cantidad) - 1
      }
    }
    

  }

  CerrarSidenav(){
    this.sidenav.close();
  }

  title = 'marianaissa';
}
