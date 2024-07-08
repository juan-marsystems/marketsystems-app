import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TipoCarritoRequest } from '../../tipo-carrito-request';
import { MarketsystemsService } from '../../marketsystems.service';
import { TipoArticuloCarrito } from '../../tipo-articulo-carrito';
import { TipoProducto } from '../../tipo-producto';

@Component({
  selector: 'app-carrito-modal',
  templateUrl: './carrito-modal.component.html',
  styleUrl: './carrito-modal.component.css'
})
export class CarritoModalComponent implements OnInit{

  carrito: TipoArticuloCarrito[] = [];
  userId: number = 0;
  productos: TipoProducto[] = [];
  totalCompra: number = 0;

  constructor(
    public dialogRef: MatDialogRef<CarritoModalComponent>,
    private service: MarketsystemsService,
  ){}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if(user){
      const usuario = JSON.parse(user);
      this.userId = usuario.idUser;
    }
    // const storedUserId = localStorage.getItem('userId');
    // if (storedUserId) {
    //   this.userId = parseInt(storedUserId, 10);
    // }
    console.log(this.userId);
    this.service.obtenerArticulosCarrito(this.userId).subscribe(
      (response) => {
        this.carrito = response;
      },
      (error) =>{
        if (error.status === 404) {
          console.log('No hay artículos en el carrito');
        } else {
          console.error('Error al obtener los artículos del carrito', error);
        }
      }
    )

  }

  incrementarCantidad(item: TipoArticuloCarrito) {
    item.cantidad++;
  }

  decrementarCantidad(item: TipoArticuloCarrito) {
    if (item.cantidad > 0) {
      item.cantidad--;
    }
  }


  vaciarCarrito(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.userId = user.idUser;
      this.service.eliminarCarrito(this.userId).subscribe(
        (response) => {
          console.log('Carrito vaciado:', response);
          alert("Carrito Vaciado")
          this.carrito = [];
        },
        (error) => {
          console.log('Error vaciando carrito:', error);
        }
      );
    }
  }

  realizarCompra(): void {
    if (window.confirm('¿Estás seguro de realizar la compra?')) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.userId = user.idUser;
        this.service.realizarCompra(this.userId).subscribe(
          (respuesta) => {
            console.log('Respuesta de compra:', respuesta);
            if (respuesta === 'Compra realizada con exito') {
              alert('Compra realizada con éxito');
              console.log('Compra realizada con éxito');
              this.obtenerArticulos(); // Método para actualizar la lista de artículos en el carrito
              this.dialogRef.close(); // Cerrar el modal
            } else {
              console.log('No se pudo realizar la compra');
              // Manejar el caso donde no se pudo realizar la compra
            }
          },
          (error) => {
            console.error('Error al realizar compra:', error);
            // Manejar el error al realizar la compra
          }
        );
      }
    }
  }


  // guardarCarrito(){
  //   this.service.guardarCarrito(this.carrito).subscribe(
  //     response => {
  //       console.log('Carrito guardado correctamente');
  //       this.dialogRef.close();
  //     },
  //     error => {
  //       console.error('Error al guardar el carrito', error);
  //     }
  //   );
  // }

  cerrarModal() {
    this.dialogRef.close();
  }

  obtenerArticulos(){
    this.service.listarArticulos().subscribe(
      productos => {
        this.productos = productos;
      },
      error => {
        console.error('Error al obtener la lista de productos', error);
      }
    );
  }

  eliminarProducto(idArt: number): void {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto del carrito?')) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.userId = user.idUser;
        this.service.eliminarProductoPorId(this.userId, idArt).subscribe(
          (response) => {
            console.log('Producto eliminado del carrito:', response);
            alert('Producto eliminado del carrito');
            // Actualizar el carrito después de eliminar el producto
            this.service.obtenerArticulosCarrito(this.userId).subscribe(
              (response) => {
                this.carrito = response;
                if (this.carrito.length === 0) {
                  this.carrito = []; // Vaciar el carrito si no hay artículos después de eliminar
                }
              },
              (error) => {
                console.error('Error al obtener los artículos del carrito después de eliminar', error);
              }
            );
          },
          (error) => {
            console.error('Error al eliminar producto del carrito:', error);
          }
        );
      }
    }
  }  


  calcularTotal(): number {
    let total = 0;
    this.carrito.forEach(articulo => {
      total += articulo.cantidad * articulo.precio;
    });
    return total;
  }

  guardarCarrito(): void {
    const carritoRequest: TipoCarritoRequest = {
      idUser: this.userId,
      detalles: this.carrito.map(articulo => ({
        idArt: articulo.idArt,
        quantityDetail: articulo.cantidad
      }))
    };
  
    this.service.editarCarrito(carritoRequest).subscribe(
      (response) => {
        console.log('Carrito editado:', response);
        alert('Carrito editado con éxito');
        // Manejo adicional si es necesario
      },
      (error) => {
        console.error('Error al guardar el carrito:', error);
        // Manejo del error específico
      }
    );
  }
  
}
