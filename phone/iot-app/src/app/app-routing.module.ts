import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DispositivosComponent } from './pages/dispositivos/dispositivos.component';
import { LoginComponent } from './pages/login/login.component';
import { MqttComponent } from './pages/mqtt/mqtt.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dispositivos',
    component: DispositivosComponent,
  },
  {
    path: 'dispositivo/:idDispotivio',
    component: MqttComponent
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
