import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Messages } from '../modelos/message.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/usuario.model';
import { GLOBAL } from './global.service';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public ruta: String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token;
  public identidad;

  constructor(public _http: HttpClient) {
    this.ruta = GLOBAL.url;
   }

   clienteWeb(usuario: Usuario): Observable<any>{
     let params = JSON.stringify(usuario);

     return this._http.post(this.ruta + 'clienteWeb', params, {headers: this.headersVariable});
    }

    credential(usuario, getToken = null): Observable<any>{
      if(getToken != null){
        usuario.getToken = getToken;
      }
      let params = JSON.stringify(usuario);

      return this._http.put(this.ruta + 'credential', params, {headers: this.headersVariable});
    }

    postMessage(messages: Messages): Observable<any>{
      let params = JSON.stringify(messages);

      let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());

      return this._http.post(this.ruta + 'message', params, {headers: headersToken});
    }

    messageID(id:String): Observable<any>{

      let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());

      return this._http.get(this.ruta + 'message/' + id, {headers: headersToken});
    }

    getMessages(): Observable<any>{

      let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());

      return this._http.get(this.ruta + 'messages', {headers: headersToken});
    }

    obtenerToken(){
     var token2 = localStorage.getItem('token');

     if(token2 != 'undefined'){
      this.token = token2;
     } else{
       this.token = null;
     }

     return this.token;
    }

    obtenerIdentidad(){
     var identidad2 = JSON.parse(localStorage.getItem('identidad'));

     if(identidad2 != 'undefined'){
       this.identidad = identidad2;
     } else{
       this.identidad = null;
     }

     return this.identidad;
    }
}
