import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DispositivosComponent } from './pages/dispositivos/dispositivos.component';
import { MqttComponent } from './pages/mqtt/mqtt.component';
import { environment as env } from '../environments/environment';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { NgxEchartsModule } from 'ngx-echarts';
import { HomePage } from './home/home.page';


const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: env.mqtt.server,
  port: env.mqtt.port,
  protocol: env.mqtt.protocol === 'wss' ? 'wss' : 'ws',
  path: '/mqtt',
  username: env.mqtt.username,
  password: env.mqtt.password,
};


@NgModule({
  declarations: [AppComponent, LoginComponent,HomePage,DispositivosComponent, MqttComponent],
  entryComponents: [],
  imports: [
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
