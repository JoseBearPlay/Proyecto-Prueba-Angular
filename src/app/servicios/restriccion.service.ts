import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class RestriccionService implements CanActivate {

  constructor(private _router:Router, private _messageService: MessageService) { }

  canActivate(){
    let identity = this._messageService.obtenerIdentidad();
    if(identity && (identity.rol === 'User')){
      return true;
    } else{
      this._router.navigate(['/login']);
      return false;
    }
  }
}
