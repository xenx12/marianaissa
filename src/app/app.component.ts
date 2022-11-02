import { Component, ViewChild, OnInit,Inject } from '@angular/core';
import productosJson from '../assets/json/productos.json'; 
import {MatSidenav} from '@angular/material/sidenav';
import {FormControl} from '@angular/forms';
import {Observable, fromEvent} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { DOCUMENT, ViewportScroller } from '@angular/common';



interface Producto {  
  id: Number;  
  titulo: String;  
  img: String;  
  textocorto: String;  
  caracteristicas: String;  
  precio: Number;
  categoria: Number;  
}  

interface Listacarrito {  
  id: Number;  
  titulo: String;
  precio: Number;  
  cantidad: Number;
}  



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {

  //countries : string[] = ['España','Ecuador','Venezuela'];

  control = new FormControl();
  filCountries: Observable<any[]> | undefined;

  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  @ViewChild('Buscador') IBuscador!: MatInput;
  
  @ViewChild('BotonBuscar') BBuscador!: MatButton;
  

  //PAra Autocompletado
  
  private _filter(val: string): any[]{
    //Pasar el dato a minuscula
    const formatVal = val.toLocaleLowerCase();
    
    return this.Todosproductos.filter(producto => producto.titulo.toLocaleLowerCase().indexOf(formatVal) === 0);

    
  }

  /*readonly showScroll$: Observable<boolean> = fromEvent(
    this.document,
    'scroll'
  ).pipe(
    map(() => this.viewport.getScrollPosition()?.[1] > 0)
  );*/

  ngOnInit() {
    this.filCountries = this.control.valueChanges.pipe(
      startWith(''),
      map(val =>  this._filter(val))
      

    );

  }


 
  //Fin Autocompletado

  Todosproductos: Producto[] = productosJson;  

  Generalcategoria: Number = 0;

  Todoslistacarrito: Listacarrito[] = [];

  ParaWs: String;

  NumeroWs = '56953523983';

  TamanoBuscador = '0%';

  ColorTitulo = 'white';

  TamanoIcono = '24px';

  TextoWs = 'Hola Mariana Issa, Necesito los siguientes porductos: %0A %0A';


  TotalCarrito: Number;

  events: string[] = [];
  opened: boolean = true;

  constructor(@Inject(DOCUMENT) private readonly document: Document, private readonly viewport: ViewportScroller){

    this.TotalCarrito = 0;

    this.ParaWs = '';
    
  }

  onScrollToTop(): void {
    //this.viewport.scrollToPosition([0, 0]);
      //alert(this.viewport.getScrollPosition());

      const estescroll =this.viewport.getScrollPosition()[1] - 130;
      const estes2scroll = this.viewport.getScrollPosition()[0];
      //alert(String(estescroll));    
    
    this.viewport.scrollToPosition([estes2scroll, estescroll] );



  }

  MostrarArticulo(val: number ){
    this.Cambiarcategoria(val);
    this.RestaurarBuscar();

    setTimeout(()=>{

      this.onScrollToTop();
    }, 500);
    
    
  }

  ParaBuscar(){
    this.TamanoBuscador = '85%';

    this.ColorTitulo = '#3f51b5';

    this.TamanoIcono = '0px';

    //this.IBuscador.focus();
  }

  RestaurarBuscar(){
    this.TamanoBuscador = '0%';

    this.ColorTitulo = 'white';

    this.TamanoIcono = '24px';
    
    //HAY QUE REINICIAR EL VALOR DEL INPUT

  }
 

  Cambiarcategoria(numero: number): void{
    this.Generalcategoria = numero;
    this.RestaurarBuscar();
  }

  Addcarrito(articulo: Number){
    this.RestaurarBuscar();
   
    //Buscar en el array de datos si esta guardado un ariculo con el nombre que recibimos
    if(this.Todoslistacarrito.findIndex(algo => algo.id == articulo) == -1){
      
      var temporalindex = this.Todosproductos.findIndex(algo => algo.id == articulo);
      
      this.Todoslistacarrito.push({
        id: this.Todosproductos[temporalindex].id,
        titulo: this.Todosproductos[temporalindex].titulo,
        precio: this.Todosproductos[temporalindex].precio,
        cantidad: 1
      } as unknown as Listacarrito )

      this.CalcularTotal();
      
    }else {

      this.SumarCantidad(articulo);
      


    }

      this.sidenav.open(); //Abre el sidenav del carrito
      //MEJORAR ESTA PARTE
  }

  Eliminararticulo(identificador: Number){
    this.Todoslistacarrito.splice(this.Todoslistacarrito.findIndex(articulo => articulo.id == identificador),1);

    this.CalcularTotal();
    
  }



  SumarCantidad(identificador: Number){

    
    let temporal = this.Todoslistacarrito[this.Todoslistacarrito.findIndex(articulo => articulo.id == identificador)];


    this.Todoslistacarrito[this.Todoslistacarrito.findIndex(articulo => articulo.id == identificador)] = {
      id: temporal.id,
      titulo: temporal.titulo,
      precio: temporal.precio,
      cantidad: Number(temporal.cantidad) + 1
    }

    this.CalcularTotal();
  }

  RestarCantidad(identificador: Number){
    let temporal = this.Todoslistacarrito[this.Todoslistacarrito.findIndex(articulo => articulo.id == identificador)];
  
    if(temporal.cantidad == 1){
      this.Eliminararticulo(identificador);
    }else{
      this.Todoslistacarrito[this.Todoslistacarrito.findIndex(articulo => articulo.id == identificador)] = {
        id: temporal.id,
        titulo: temporal.titulo,
        precio: temporal.precio,
        cantidad: Number(temporal.cantidad) - 1
      }
    }

    this.CalcularTotal();
    

  }

  CerrarSidenav(){
    this.sidenav.close();
    this.RestaurarBuscar();
  }

  CalcularTotal(){
    
    var totaltemporal = 0;
    var TextoWsTemporal = '';
    this.TextoWs = 'Hola Mariana Issa, Necesito los siguientes porductos: %0A %0A';
    
    this.Todoslistacarrito.forEach(function(articulo){
      totaltemporal = totaltemporal + (Number(articulo.precio)* Number(articulo.cantidad));
      TextoWsTemporal = String(TextoWsTemporal) +  articulo.titulo + '.%0ACantidad: ' + articulo.cantidad + '.%0APrecio: ' + articulo.precio + '%0A%0A'; 
    })

    this.TextoWs = this.TextoWs + TextoWsTemporal +  'Total: ' + totaltemporal;
    this.TotalCarrito = totaltemporal;


  
   
    this.ParaWs = 'https://api.whatsapp.com/send/?phone=' + this.NumeroWs + '&text=' + this.TextoWs + '&type=phone_number&app_absent=0';

    
  }

  EnviarWs(){
    this.RestaurarBuscar();
    this.sidenav.close(); 
    this.Todoslistacarrito = [];
    this.TotalCarrito = 0;
    //this.ParaWs = '';

  }

  title = 'marianaissa';
}
