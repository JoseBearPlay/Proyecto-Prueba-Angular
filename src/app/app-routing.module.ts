import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { MessagesComponent } from './componentes/message/messages.component';
import { RestriccionService } from './servicios/restriccion.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'message', component: MessagesComponent, canActivate:[RestriccionService]},
  { path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
