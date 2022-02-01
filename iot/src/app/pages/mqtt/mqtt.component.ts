import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMqttMessage } from 'ngx-mqtt';
import { EventMqttService } from 'src/app/services/event.mqtt.service';
import LinearGradient from 'zrender/lib/graphic/LinearGradient';
import { Router, ActivatedRoute } from '@angular/router';
import { Dispositivo } from 'src/app/interfaces/dispositivo.interface';

@Component({
  selector: 'mqtt-app',
  templateUrl: './mqtt.component.html',
  styleUrls: ['./mqtt.component.scss'],
})
export class MqttComponent implements OnInit {
  public events: Dispositivo[] = [];

  private deviceId: string;

  public options: any;

  public subscription: Subscription = new Subscription();

  public temperatura: number = 0;

  public humedad: number = 0;

  public temperaturaYHumedad: string = '';

  public deviceClass: string = '';

  public cargando: boolean;

  constructor(
    private readonly eventMqtt: EventMqttService,
    private router: ActivatedRoute
  ) {
    this.deviceId = this.router.snapshot.paramMap.get('idDispotivio')!;
    this.cargando = false;
  }

  ngOnInit() {
    this.subscribeToTopic();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  enviar(msgcontent: string) {
    let datos = {
      DeviceClass: '03',
      IdDevice: '000D2BF9',
      MsgType: '02',
      MsgContent: msgcontent,
    };
    this.eventMqtt
      .enviar(this.deviceId, JSON.stringify(datos))
      .subscribe((data: any) => {});
  }

  private subscribeToTopic() {
    this.subscription = this.eventMqtt
      .topic(this.deviceId)
      .subscribe((data: IMqttMessage) => {
        let item: Dispositivo = JSON.parse(data.payload.toString());

        this.deviceClass = item.DeviceClass;

        // this.events.push(item);
        // console.log(this.events);

        this.cargando = true;

        if (item.DeviceClass == '08') {
          this.temperaturaYHumedad = item.MsgContent.replace('H', ' ');

          this.temperaturaYHumedad = this.temperaturaYHumedad.replace('T', ' ');

          this.temperatura = parseInt(this.temperaturaYHumedad.split(' ')[1]);

          this.humedad = parseInt(this.temperaturaYHumedad.split(' ')[2]);

          this.ActualizarGrafico([this.temperatura, this.humedad]);
        }
        if (item.DeviceClass == '03') {
          item.fechaActual = `${new Date().getHours()}:${String(
            new Date().getMinutes()
          ).padStart(2, '0')}:${String(new Date().getSeconds()).padStart(
            2,
            '0'
          )}`;
          this.events.push(item);
          console.log(this.events);
        }
      });
  }
  onChartEvent(event: any, type: string) {}
  ActualizarGrafico(valores: number[]) {
    const dataAxis = ['Temperatura', 'Humedad'];
    let data = valores;
    const yMax = 100;
    const dataShadow = [];

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }

    this.options = {
      title: {
        text: 'Eventos',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: true,
          color: '#fff',
        },
        axisTick: {
          show: true,
        },
        axisLine: {
          show: true,
        },
        z: 10,
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {},
      },
      dataZoom: [
        {
          type: 'inside',
        },
      ],
      series: [
        {
          // For shadow
          name: 'Total',
          type: 'bar',
          itemStyle: {
            color: 'rgba(0,0,0,0.05)',
          },
          barGap: '-100%',
          barCategoryGap: '40%',
          data: dataShadow,
          animation: false,
        },
        {
          type: 'bar',
          name: 'Valor actual',
          itemStyle: {
            color: new LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' },
              ]),
            },
          },
          data,
        },
      ],
    };
  }
}
