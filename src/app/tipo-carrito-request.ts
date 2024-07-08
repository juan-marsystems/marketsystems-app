import { TipoDetalleRequest } from "./tipo-detalle-request";

export class TipoCarritoRequest{
    idUser: number = 0;
    detalles: TipoDetalleRequest[] = [];
}