import { Component } from '@angular/core';
import { GlobalService } from '../../../shared/service/global';
import { IEncuesta, IRespuestas } from '../../../shared/interface/listas';

@Component({
  selector: 'app-encuesta', 
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.scss'
})
export class EncuestaComponent {

  
  index: number = 0;
  currentQuestion : IEncuesta =  {} as IEncuesta;
  imagenPregunta : string = 'assets/encuesta/pregunta.png'
  arrayEncuesta : IEncuesta[] = [];
  usedIndices : any[] = [];
  newQuestion : boolean = false;
  classRespuesta = {
    'resp--valid': false,
    'resp--error': false,
    'resp--default': true,
  };

  constructor(
    private globalsrv : GlobalService
  ){ 
    this.onLoadEncuesta();
  }

  onLoadEncuesta( ){
    this.globalsrv.getDatosEncuesta().subscribe((resp)=> {
      this.arrayEncuesta = resp;
      this.usedIndices = [];
      this.showRandomQuestion();
    })
  }

   
	onValidateRespuesta(id : number, resp : IRespuestas){
    this.newQuestion = false;
    this.arrayEncuesta[id].opciones_respuesta.forEach(element => { 
      if(element.opcion === resp.opcion ){   
         if(element.value === true){
          element.clase = 'resp--valid';
          element.opcion = '&#x2713';
         }else{
          element.clase = 'resp--error'; 
          element.opcion = 'X';
         }
      }else{
        element.clase = 'resp--default'; 
      } 
    }); 
    console.log(this.usedIndices.length );
    if(this.usedIndices.length < 4){
      setTimeout(() => {
        this.showRandomQuestion();
        this.newQuestion = true;
      }, 1500);
    }else{

    }
  
	}
 
  showRandomQuestion() { 
    let randomIndex  = Math.floor(Math.random() * this.arrayEncuesta.length);
    let existe = this.usedIndices.includes(randomIndex);
    if(!existe){
      this.usedIndices.push(randomIndex); // add the used index to the array 
      this.currentQuestion = this.arrayEncuesta[randomIndex]; 
      this.newQuestion = true;
    }
   
  }

}
