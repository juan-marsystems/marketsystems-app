import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioRegistroComponent } from './usuario/usuario-registro/usuario-registro.component';
import { UsuarioLoginComponent } from './usuario/usuario-login/usuario-login.component';
import { ProductoCatalogoComponent } from './producto/producto-catalogo/producto-catalogo.component';
import { ProductoInfoComponent } from './producto/producto-info/producto-info.component';
import { CarritoModalComponent } from './carrito/carrito-modal/carrito-modal.component';
import { OrdenModalComponent } from './ordenes/orden-modal/orden-modal.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioRegistroComponent,
    UsuarioLoginComponent,
    ProductoCatalogoComponent,
    ProductoInfoComponent,
    CarritoModalComponent,
    OrdenModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  exports: [ UsuarioRegistroComponent ]
})
export class AppModule { }
