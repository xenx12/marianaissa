import { Component } from '@angular/core';
import productosJson from '../assets/json/productos.json'; 

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  Todosproductos: Producto[] = productosJson;  

  Generalcategoria: Number = 0;

  events: string[] = [];
  opened: boolean = true;

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);




  Cambiarcategoria(numero: number): void{
    this.Generalcategoria = numero;
    
  }
  title = 'marianaissa';
}
