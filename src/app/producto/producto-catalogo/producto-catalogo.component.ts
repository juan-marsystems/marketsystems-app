import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TipoProducto } from '../../tipo-producto';
import { MarketsystemsService } from '../../marketsystems.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductoInfoComponent } from '../producto-info/producto-info.component';
import { TipoOrden } from '../../tipo-orden';
import { OrdenModalComponent } from '../../ordenes/orden-modal/orden-modal.component';
import { TipoCarritoRequest } from '../../tipo-carrito-request';
import { TipoDetalleRequest } from '../../tipo-detalle-request';
import { CarritoModalComponent } from '../../carrito/carrito-modal/carrito-modal.component';


@Component({
  selector: 'app-producto-catalogo',
  templateUrl: './producto-catalogo.component.html',
  styleUrl: './producto-catalogo.component.css'
})
export class ProductoCatalogoComponent implements OnInit{
  usuarioNombre: string = '';
  productos: TipoProducto[] = [];
  usuarioId: number = 0;
  carrito: TipoCarritoRequest = {idUser: 0, detalles: [] };

  constructor(
    private service: MarketsystemsService, 
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    // Obtener datos del usuario desde localStorage
    const user = localStorage.getItem('user');
    if(user){
      const usuario = JSON.parse(user);
      this.usuarioNombre = usuario.nameUser;
      this.usuarioId = usuario.idUser;
      console.log(this.usuarioNombre);
    }

    // Obtener lista de productos desde el servicio
    this.service.listarArticulos().subscribe(
      productos => {
        this.productos = productos;
      },
      error => {
        console.error('Error al obtener la lista de productos', error);
      }
    );
  }


  cerrarSesion(){
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }


  verMasInfo(id: number){
    this.service.obtenerArticuloPorId(id).subscribe((producto) => {
      this.dialog.open(ProductoInfoComponent, {
        data: producto
      });
    });
  }


  abrirOrdenes(){
    const user = localStorage.getItem('user');
    if(user){
      const usuario = JSON.parse(user);
      const userId = usuario.idUser;
      this.service.obtenerOrdenesPorUsuario(userId).subscribe((ordenes: TipoOrden[]) => {
        const dialogRef = this.dialog.open(OrdenModalComponent, {
          width: '600px',
          data: { ordenes }
        });
      }, (error) => {
        const dialogRef = this.dialog.open(OrdenModalComponent, {
          width: '600px',
          data: { ordenes: [] }
        });
      });
    }
  }


  agregarAlCarrito(producto: any): void {
    const user = localStorage.getItem('user');
    if (user) {
      const usuario = JSON.parse(user);
      const userId = usuario.idUser;
      const detalle: TipoDetalleRequest = { idArt: producto.idArt, quantityDetail: 1 };
      const detalles: TipoDetalleRequest[] = [detalle];
      
      this.service.insertarCarrito(userId, detalles).subscribe(
        response => {
          console.log('Producto agregado al carrito:', response);
          alert("Producto agregado al carrito");
          // Aquí podrías actualizar la interfaz de usuario, mostrar una notificación, etc.
        },
        error => {
          console.error('Error al agregar producto al carrito:', error);
        }
      );
    }
  }


  abrirCarrito() {
    const dialogRef = this.dialog.open(CarritoModalComponent, {
      width: '600px',
      height: '400px',
      data: { carrito: this.carrito }
    });
  }
}
