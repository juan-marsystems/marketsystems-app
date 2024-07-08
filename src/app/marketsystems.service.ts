import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { TipoUsuario } from './tipo-usuario';
import { TipoProducto } from './tipo-producto';
import { TipoOrden } from './tipo-orden';
import { TipoCarritoRequest } from './tipo-carrito-request';
import { TipoArticuloCarrito } from './tipo-articulo-carrito';
import { TipoDetalleRequest } from './tipo-detalle-request';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable({
  providedIn: 'root',
})
export class MarketsystemsService {
  private url: string = 'https://localhost:7067/api/';
  subjectUpdate = new Subject<any>();
  constructor(private http: HttpClient) {}

  //Accesors
  getActualizarService(): Observable<any> {
    return this.subjectUpdate.asObservable();
  }

  setActualizarService(esActualizado: boolean) {
    this.subjectUpdate.next(esActualizado);
  }


  //Metodos para Usuario
  registrarUsuario(usuario: TipoUsuario): Observable<TipoUsuario>{
    const postUrl = `${this.url}Usuarios/insertarUsuario`;
    return this.http.post<TipoUsuario>(postUrl, usuario);
  }

  iniciarSesion(email: string, password: string): Observable<TipoUsuario>{
    const selectUrl = `${this.url}Usuarios/obtenerUsuario?email=${email}&password=${password}`;
    return this.http.get<TipoUsuario>(selectUrl);
  }


  //Metodos para Articulos
  listarArticulos(): Observable<TipoProducto[]>{
    const listUrl = `${this.url}Articulos/listarArticulos`;
    return this.http.get<TipoProducto[]>(listUrl);
  }

  obtenerArticuloPorId(id: number): Observable<TipoProducto>{
    const getUrl = `${this.url}Articulos/obtenerArticuloPorId?id=${id}`;
    return this.http.get<TipoProducto>(getUrl);
  }


  //Metodo para Ordenes
  obtenerOrdenesPorUsuario(userId: number): Observable<TipoOrden[]>{
    const getUrl = `${this.url}Ordenes/obtenerOrdenesPorUsuario?userId=${userId}`;
    return this.http.get<TipoOrden[]>(getUrl);
  }


  //Metodo para Carritos
  obtenerArticulosCarrito(userId: number): Observable<TipoArticuloCarrito[]>{
    const getUrl = `${this.url}Carritos/obtenerArticulosCarrito?userId=${userId}`;
    return this.http.get<TipoArticuloCarrito[]>(getUrl);
  }

  eliminarCarrito(userId: number): Observable<any> {
    const deleteUrl = `${this.url}Carritos/eliminarCarrito?userId=${userId}`;
    return this.http.delete(deleteUrl, { responseType: 'text' });
  }

  realizarCompra(userId: number): Observable<string> {
    const postUrl = `${this.url}Ordenes/realizarCompra?userId=${userId}`;
    return this.http.post<string>(postUrl, null, { responseType: 'text' as 'json' }); // Usar 'text' para responseType
  }

  insertarCarrito(idUser: number, detalles: TipoDetalleRequest[]): Observable<string> {
    const postUrl = `${this.url}Carritos/insertarCarrito`;
    const requestBody = { idUser, detalles };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<string>(postUrl, requestBody, { headers, responseType: 'text' as 'json' });
  }

  eliminarProductoPorId(userId: number, idArt: number): Observable<string> {
    const deleteUrl = `${this.url}Carritos/eliminarProductoPorId?userId=${userId}&artId=${idArt}`;
    return this.http.delete(deleteUrl, { responseType: 'text' });
  }

  editarCarrito(carritoRequest: TipoCarritoRequest): Observable<string> {
    const editUrl = `${this.url}Carritos/editarCarrito`;
    // Asegúrate de configurar correctamente el responseType
    return this.http.put<string>(editUrl, carritoRequest, { responseType: 'text' as 'json' });
  }

}
