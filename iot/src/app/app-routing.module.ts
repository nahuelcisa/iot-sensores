import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegistroComponent } from './pages/registro/registro.component';

import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './services/auth/auth.guard';
import { MaquinasComponent } from './pages/maquinas/maquinas.component';
import { CambioClaveComponent } from './pages/cambio-clave/cambio-clave.component';
import { ListaUsersComponent } from './pages/lista-users/lista-users.component';
import { AuthperfilGuard } from './services/auth/authperfil.guard';
import { MqttClientService } from 'ngx-mqtt';
import { MqttComponent } from './pages/mqtt/mqtt.component';
import { DashboardmaquinasComponent } from './pages/dashboardmaquinas/dashboardmaquinas.component';
import { LogicaMaquinasComponent } from './pages/logica-maquinas/logica-maquinas.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'restablecer', component: CambioClaveComponent },
  { path: 'restablecer/:email', component: CambioClaveComponent },
  {
    path: 'cambiarPassword',
    component: CambioClaveComponent,
    canActivate: [AuthGuard],
  },
  { path: 'maquinas', component: MaquinasComponent, canActivate: [AuthGuard] },
  { path: 'miperfil', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'listausuarios',
    component: ListaUsersComponent,
    canActivate: [AuthGuard, AuthperfilGuard],
  },
  {
    path: 'mismaquinas',
    component: DashboardmaquinasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dispositivo/:idDispotivio',
    component: MqttComponent,
    canActivate: [AuthGuard],
  },
  { path: 'todaslasmaquinas', component: LogicaMaquinasComponent, canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
