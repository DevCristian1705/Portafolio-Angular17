import {  Component, ElementRef, Renderer2 } from '@angular/core';
import { GlobalService } from '../../../shared/service/global';
import { IEncuesta, IRespuestas } from '../../../shared/interface/listas';
import { messageEncuesta } from '../../../shared/components/message-type/message-type';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogEncuestaComponent } from '../../../shared/components/dialog/dialog-encuesta/dialog-encuesta.component';
 

@Component({
  selector: 'app-encuesta', 
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.scss'
})
export class EncuestaComponent {
 
  currentQuestion : IEncuesta = {} as IEncuesta; 
  questionValid : any[] = []; 
  answer : boolean = false;
  classRespuesta = {
    'resp--valid': false,
    'resp--error': false,
    'resp--default': true,
  };

  constructor(
    private globalsrv : GlobalService,
    public dialog: MatDialog, 
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router, 
  ){  
  }
 
  get encuestas(): IEncuesta[] {
    return this.globalsrv.encuestas;
  }


  ngOnInit(){
    this.showRandomQuestion(); 
  }

	 onValidateRespuesta(id : number, resp : IRespuestas){ 
    this.answer = true;
    this.encuestas.forEach(element => { 
      if(element.respuesta_correcta === resp.opcion ){   
        this.questionValid.push(id);
          resp.opcion = '✔';
          resp.clase = 'resp--valid';
      }
    });
      // }else{
      //     element.clase = 'resp--error'; 
      //     element.opcion = 'X';
      //     this.imagenPregunta =  this.currentQuestion.imagen;
      //    }


      // }else{
      //   element.clase = 'resp--default'; 
      // } 
    // });   
    //this.arrayEncuesta = this.arrayEncuesta.filter((q: any) => q.id_encuesta != id);
    this.onAnimationTitleRemove();
    this.onAnimationRemove();
    // this.validateLastQuestion();
   
	 }

  // validateLastQuestion(){   
  //   setTimeout(() => {
  //     if (this.arrayEncuesta.length > 0) { 
  //      // this.showRandomQuestion();
  //     }else{
  //       messageEncuesta.finish.puntaje =  this.questionValid.length;
  //       messageEncuesta.finish.total =  this.arrayEncuestaOrigin.length;
      
  //       const dialogRef = this.dialog.open(DialogEncuestaComponent, {
  //         disableClose: false, width: '350px', data: messageEncuesta.finish 
  //       });

  //       dialogRef.afterClosed().subscribe((resp: boolean) => { 
  //         if(resp){    
  //        //  this.onReset();
  //          this.questionValid = [];  
  //          this.showRandomQuestion(); 
  //         }else{
  //           this.router.navigateByUrl('/dashboard')
  //         }
  //       });  
  //     }  
  //   }, 1000); 
  // }
 
  // onReset(){ 
  //   this.arrayEncuesta.forEach((element: IEncuesta) => {
  //     element.opciones_respuesta.forEach((elem, i) => {  
  //       elem.opcion = this.setCodeQuestion(i+1);
  //       elem.clase = 'resp--default';  
  //     });  
  //   });
 
  //   this.arrayEncuestaOrigin.forEach((element: IEncuesta) => {
  //     element.opciones_respuesta.forEach((elem, i) => {  
  //       elem.opcion = this.setCodeQuestion(i+1);
  //       elem.clase = 'resp--default';  
  //     });  
  //   });

  //   this.questionValid = [];  
  // }
 
  // setCodeQuestion(code : number){ 
  //   const classEstado: { [key: number]: string } = {
  //     1  : 'A',
  //     2  : 'B',
  //     3  : 'C',
  //     4  : 'D',
  //     5  : 'E',
  //   }; 
  //   return classEstado[code]; 
  // }

    showRandomQuestion() { 
      this.answer = false;
      this.onAnimation();
      this.onAnimationTitle(); 
      let randomQuestion;
      do { randomQuestion = this.encuestas[Math.floor(Math.random()*this.encuestas.length)];
      } while (this.currentQuestion.id_encuesta == randomQuestion.id_encuesta); 
      this.currentQuestion = randomQuestion;  
    } 

    onAnimationTitle(){ 
      const elements = this.el.nativeElement.querySelectorAll('.opcion-titulo');
      elements.forEach((element: any) => {  
        this.renderer.addClass(element, 'loader-title-encuesta');   
      });
    }

   onAnimationTitleRemove(){ 
    const elements = this.el.nativeElement.querySelectorAll('.opcion-titulo');
    elements.forEach((element: any) => {  
        this.renderer.removeClass(element, 'loader-title-encuesta');  
    });
   }


   onAnimation(){ 
    const elements = this.el.nativeElement.querySelectorAll('.encuesta');
    elements.forEach((element: any) => { 
      this.renderer.addClass(element, 'change-question-fade');  
    });
   }

   
   onAnimationRemove(){ 
    const elements = this.el.nativeElement.querySelectorAll('.encuesta');
    elements.forEach((element: any) => { 
      this.renderer.removeClass(element, 'change-question-fade');  
    });
   }

 
}
