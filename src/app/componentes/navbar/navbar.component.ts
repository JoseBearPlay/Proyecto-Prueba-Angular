import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/servicios/message.service';
import { ScriptService } from 'src/app/servicios/script.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [MessageService]
})
export class NavbarComponent implements OnInit {

  constructor( private _Scripts: ScriptService, public _messageService: MessageService
    ) {
      _Scripts.Carga(["navbar/navbar"])
     }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    Swal.fire({
      icon: 'success',
      title: 'Sesion Terminada',
      text: 'Su sesion se cerro correctamente'
    })
  }

}
