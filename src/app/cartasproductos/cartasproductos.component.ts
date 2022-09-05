import { Component, OnInit } from '@angular/core';
import productosJson from './productos.json';  

interface Producto {  
  id: Number;  
  titulo: String;  
  img: String;  
  textocorto: String;  
  caracteristicas: String;  
  precio: String;  
}  

@Component({
  selector: 'app-cartasproductos',
  templateUrl: './cartasproductos.component.html',
  styleUrls: ['./cartasproductos.component.css']
})
export class CartasproductosComponent implements OnInit {
  
  productos: Producto[] = productosJson;  

  constructor() { }

  ngOnInit(): void {


  }

}
