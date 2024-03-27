import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appAddPoints'
})
export class AddPointsPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    if (value.length > args) {
      const firstPart = value.slice(0, args);
      return firstPart + '...';
    }
  return value;
  } 
}