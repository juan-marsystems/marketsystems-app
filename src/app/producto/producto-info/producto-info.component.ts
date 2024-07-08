import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoProducto } from '../../tipo-producto';

@Component({
  selector: 'app-producto-info',
  templateUrl: './producto-info.component.html',
  styleUrl: './producto-info.component.css'
})
export class ProductoInfoComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: TipoProducto){
    
  }
}
