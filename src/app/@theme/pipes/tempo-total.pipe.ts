import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'tempoTotal'
})
export class TempoTotalPipe implements PipeTransform {
  transform(items: any): any {
    if(!items) return [];
    let segundos = Math.round((+new Date(items.horaSaida) - +new Date(items.horaEntrada)) / 1000);
    const intervalos = {
        'ano': 31536000,
        'mes': 2592000,
        'sem': 604800,
        'd': 86400,
        'hr': 3600,
        'min': 60,
        's': 1
    };
    let counter:number,total: string='';
    for (const i in intervalos) {
        counter = Math.floor(segundos / intervalos[i]);
        if (counter > 0){
          total+= counter+ (counter!=1&&i!='s'?i+'s':i=='mes'?i+'es':i) + ' ' ;
          segundos-= counter*intervalos[i]; // singular/plural
        }
    }
      return total;
   }
}