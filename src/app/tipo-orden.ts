import { TipoArticuloCarrito } from "./tipo-articulo-carrito";

export class TipoOrden{
    numeroOrden: number = 0;
    fechaOrden: Date = new Date;
    totalOrden: number = 0;
    numeroCarrito: number = 0;
    articulos: TipoArticuloCarrito[] = [];
}