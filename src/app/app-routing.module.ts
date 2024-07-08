import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioRegistroComponent } from './usuario/usuario-registro/usuario-registro.component';
import { UsuarioLoginComponent } from './usuario/usuario-login/usuario-login.component';
import { ProductoCatalogoComponent } from './producto/producto-catalogo/producto-catalogo.component';

const routes: Routes = [
  {path: '', component: UsuarioRegistroComponent },
  {path: 'login', component: UsuarioLoginComponent},
  {path: 'catalogo', component: ProductoCatalogoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
