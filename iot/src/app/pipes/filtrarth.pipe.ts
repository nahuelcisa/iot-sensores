import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarth',
})
export class FiltrarthPipe implements PipeTransform {
  transform(value: string): string {
    const temperatura = value.substring(1, 5);
    const humedad = value.substring(7, 11);
    return 'Temperatura: °' + temperatura + ' Humedad: %' + humedad;
  }
}
