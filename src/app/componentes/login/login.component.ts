import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario.model';
import { MessageService } from 'src/app/servicios/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  public usuarioModel: Usuario;
  public token;
  public identidad;

  constructor(
    private _messageService: MessageService,
    public _router: Router
  ) {
    this.usuarioModel = new Usuario('','','','','');
  }

  ngOnInit(): void {
  }

  obtenerToken(){
    this._messageService.credential(this.usuarioModel, 'true').subscribe(
      response => {
        this.token = response.token;
        localStorage.setItem('token', this.token);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  credential(){
    this._messageService.credential(this.usuarioModel).subscribe(
      response=>{
        this.identidad = response.credencialesEncontradas;
        localStorage.setItem('identidad', JSON.stringify(this.identidad));
        this.obtenerToken();
        Swal.fire({
          icon:'success',
          title: 'OK!',
          text: 'Bienvenido ' + [this.usuarioModel.username] +' a la App Web. Agregue un mensaje para ver todos sus mensajes',
        })
        this._router.navigate(['/message'])
      },
      error=>{
        Swal.fire({
          icon: 'error',
          title: 'Ooopps...!',
          text: 'Credenciales incorrectas o aun no existe su usuario dentro de nuestro servidor web'
        })
      }
    )
  }

}
