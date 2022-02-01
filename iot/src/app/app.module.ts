import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PDashboardModule } from './pages/partials/p-dashboard/p-dashboard.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { MaquinasComponent } from './pages/maquinas/maquinas.component';
import { CambioClaveComponent } from './pages/cambio-clave/cambio-clave.component';
import { ListaUsersComponent } from './pages/lista-users/lista-users.component';
import { DataTablesModule } from 'angular-datatables';
import { InterceptorService } from './services/interceptor.service';

import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { environment as env } from '../environments/environment';
import { MqttComponent } from './pages/mqtt/mqtt.component';
import { FiltrarthPipe } from './pipes/filtrarth.pipe';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardmaquinasComponent } from './pages/dashboardmaquinas/dashboardmaquinas.component';
import { LogicaMaquinasComponent } from './pages/logica-maquinas/logica-maquinas.component';

const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: env.mqtt.server,
  port: env.mqtt.port,
  protocol: env.mqtt.protocol === 'wss' ? 'wss' : 'ws',
  path: '/mqtt',
  username: env.mqtt.username,
  password: env.mqtt.password,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistroComponent,
    ProfileComponent,
    MaquinasComponent,
    CambioClaveComponent,
    ListaUsersComponent,
    MqttComponent,
    FiltrarthPipe,
    DashboardmaquinasComponent,
    LogicaMaquinasComponent,
  ],
  imports: [
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    PDashboardModule,
    DataTablesModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
