import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MarketsystemsService } from '../../marketsystems.service';
import { TipoUsuario } from '../../tipo-usuario';


@Component({
  selector: 'app-usuario-registro',
  templateUrl: './usuario-registro.component.html',
  styleUrl: './usuario-registro.component.css'
})
export class UsuarioRegistroComponent {

  nombre: string = '';
  apellido: string = '';
  edad: number = 0;
  email: string = '';
  password: string = '';

  constructor(private service: MarketsystemsService, private router: Router){}

  onRegister() {
    const nuevoUsuario: TipoUsuario = {
      nameUser: this.nombre,
      surnameUser: this.apellido,
      ageUser: this.edad,
      emailUser: this.email,
      passUser: this.password
    };
    this.service.registrarUsuario(nuevoUsuario).subscribe(response => {
      alert("Usuario registrado con exito");
      this.router.navigate(['/login']);
    }, error => {
      alert("error");
    });
    
  }
}
