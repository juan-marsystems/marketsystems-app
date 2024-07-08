import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MarketsystemsService } from '../../marketsystems.service';
import { TipoUsuario } from '../../tipo-usuario';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrl: './usuario-login.component.css'
})
export class UsuarioLoginComponent {

  email: string = '';
  password: string = '';

  constructor(private service: MarketsystemsService, private router: Router){}

  onLogin() {
    this.service.iniciarSesion(this.email, this.password).subscribe({
      next: (usuario: TipoUsuario) => {
        alert("Inicio de Sesion Correcto");
        localStorage.setItem('user', JSON.stringify(usuario));
        this.router.navigate(['/catalogo']);
      },
      error: (error) => {
        alert("Error");
      }
    });
  }
}
