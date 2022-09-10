import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'iconmenu',
  templateUrl: './iconmenu.component.html',
  styleUrls: ['./iconmenu.component.css']
})
export class IconmenuComponent implements OnInit {
  constructor() {
   }
   emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {
    
  }

}

