import { Pipe, PipeTransform } from '@angular/core';
import { IEncuesta } from '../../app/shared/interface/listas';

@Pipe({
    name: 'imagenDefault'
})

export class ImagenDefaultPipe implements PipeTransform {

    transform(encuesta: IEncuesta, ...args: any[]): any { 
        const [ selectAnswer ] = args;  

        if(!selectAnswer){ 
            return 'assets/encuesta/pregunta.png'
        }else{
            return encuesta.imagen;
        } 
    } 
    
}