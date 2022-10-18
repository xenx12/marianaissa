import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';



@Component({
  selector: 'iconmenu',
  templateUrl: './iconmenu.component.html',
  styleUrls: ['./iconmenu.component.css']
})


export class IconmenuComponent implements OnInit {

  @Output() Eventocambiarcategoria = new EventEmitter<number>();

  constructor() {

    
   }
   emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {
    
  }


  Cambiarcategorias (numero: number ): void {
    this.Eventocambiarcategoria.emit(numero);
   
  }

}

