import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventMqttService {
  private endpoint: string;

  constructor(private _mqttService: MqttService) {
    this.endpoint = 'test';
  }

  topic(deviceId: string): Observable<IMqttMessage> {
    let topicName = `${this.endpoint}/${deviceId}`;
    return this._mqttService.observe(topicName);
  }

  enviar(deviceId: string, data: string) {
    let topicName = `${this.endpoint}/${deviceId}`;
    return this._mqttService.publish(topicName, data);
  }
}
