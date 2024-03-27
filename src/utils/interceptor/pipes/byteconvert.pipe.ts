import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: 'byteconvert'
})
export class ByteConvertPipe implements PipeTransform {

  transform(value: any, ...args: any[]) {

  }

}

enum EQUIVALENCE {
  'B'  = 1024,
  'KB' = 1024,
  'MB' = 1024,
  'GB' = 1024,
  'TB' = 1024,
  'PB' = 1024,
  'EB' = 1024,
  'ZB' = 1024,
  'YB' = 1024,
  'BB' = 1024,
}
