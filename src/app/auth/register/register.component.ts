import { Component, OnInit } from '@angular/core';
//Servicios de autenticación del usuario
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  cargando: boolean;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit(data: any) {
    console.log(data);
    this.authService.crearUsuario(data.nombre, data.email, data.password);
  }

}
