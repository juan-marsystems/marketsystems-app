import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoOrden } from '../../tipo-orden';

@Component({
  selector: 'app-orden-modal',
  templateUrl: './orden-modal.component.html',
  styleUrl: './orden-modal.component.css'
})
export class OrdenModalComponent {

  constructor(
    public dialogRef: MatDialogRef<OrdenModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ordenes: TipoOrden[] }
  ){

  }

  cerrar(): void {
    this.dialogRef.close();
  }

  
}
