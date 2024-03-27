import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatterCci'
})
export class FromatterCCIPipe implements PipeTransform {

  firstFormatter :any = "";

  transform(value: any, ...args: any[]) {
    if (!value) {
      return '';
    }
    
    if(value.length === 20){
      //000-000-000000000000-00 
      this.firstFormatter = `${value.substring(0, 3)}-${value.substring(3, 6)}-${value.substring(6, 18)}-${value.substring(18, 20)}`;
    }else{
      this.firstFormatter =  value;
    }

    return this.firstFormatter
  }
}