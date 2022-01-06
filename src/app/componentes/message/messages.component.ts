import { Component, OnInit } from '@angular/core';
import { Messages } from 'src/app/modelos/message.model';
import { MessageService } from 'src/app/servicios/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [MessageService]
})
export class MessagesComponent implements OnInit {

  public messagesList;
  public messagesIDModel: Messages;

  constructor(public _messagesService: MessageService) {
    this.messagesIDModel = new Messages('','','');
  }

  ngOnInit(): void {
  }

  messages(){
    this._messagesService.postMessage(this.messagesIDModel).subscribe(
      response => {
        console.log(response);
          Swal.fire({
            icon: 'success',
            title: '!OK!',
            text: 'Datos almacenados correctamente',
          }),
          this.getMessages();
      },
      error => {
        console.log(<any>error);
        Swal.fire({
          icon: 'warning',
          title: '!Ooopppsss...!',
          text: 'No se han podido agregar los datos al servidor web'
        })
      }
    )
  }

  getMessages(){
    this._messagesService.getMessages().subscribe(
      response=>{
        console.log(response.messages);
          this.messagesList = response.messages;
            Swal.fire({
              icon: 'success',
              title: '!OK!',
              text: 'Mensajes obtenidos correctamente del servidor Web'
            })
      },
      error=>{
        console.log(<any>error);
          Swal.fire({
            icon: 'warning',
            title: '!Oooppss...!',
            text: 'No se han podido obtener los datos del servidor web'
          })
      }
    )
  }

  getMessagesID(id){
    this._messagesService.messageID(id).subscribe(
      response => {
        this.messagesIDModel = response.messageEncontrado;
          console.log(response.messageEncontrado);
            Swal.fire({
              icon: 'success',
              title: 'Mensajes de la etiqueta ' + [this.messagesIDModel.tags] + ' obtenidos correctamente'
            })
      }
    )
  }

}
