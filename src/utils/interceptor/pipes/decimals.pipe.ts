import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'decimalFormat'
})

export class decimalsFormatPipe implements PipeTransform {

 transform(value: any, decimals: number = 2): string {
    if (!value) {
      return '0';
    }
    if (typeof value !== 'number') {
      value = Number(value);
    }

    return value.toFixed(decimals);
 }
}

